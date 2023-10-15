import { savePlaylist } from "./Spotify";

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: "playlistId" }),
  })
);

// Mock the getAccessToken function
jest.mock("./getAccessToken", () => ({
  getAccessToken: jest.fn(() => Promise.resolve("accessToken")),
}));

describe("savePlaylist", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a playlist and add tracks to it", async () => {
    const name = "My Playlist";
    const trackUris = ["uri1", "uri2"];

    const result = await savePlaylist(name, trackUris);

    expect(fetch).toHaveBeenCalledTimes(2);

    expect(fetch).toHaveBeenCalledWith("https://api.spotify.com/v1/me", {
      headers: { Authorization: "Bearer accessToken" },
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.spotify.com/v1/users/userId/playlists",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer accessToken",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    expect(fetch).toHaveBeenCalledWith(
      "https://api.spotify.com/v1/playlists/playlistId/tracks",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer accessToken",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: trackUris }),
      }
    );

    expect(result).toEqual({ id: "playlistId" });
  });

  it("should throw an error if userResponse is not ok", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Unauthorized",
      })
    );

    await expect(savePlaylist("My Playlist", ["uri1", "uri2"])).rejects.toThrow(
      "Failed to retrieve user ID: Unauthorized"
    );
  });

  it("should throw an error if createPlaylistResponse is not ok", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: "userId" }),
      })
    );

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        statusText: "Bad Request",
      })
    );

    await expect(savePlaylist("My Playlist", ["uri1", "uri2"])).rejects.toThrow(
      "Failed to create playlist: Bad Request"
    );
  });

  it("should throw an error if addTracksResponse is not ok", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: "userId" }),
      })
    );

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: "playlistId" }),
      })
    );

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: { message: "Error adding tracks to playlist" },
          }),
      })
    );

    await expect(savePlaylist("My Playlist", ["uri1", "uri2"])).rejects.toThrow(
      "Failed to add tracks to playlist: Error adding tracks to playlist"
    );
  });
});