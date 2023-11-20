const clientId = 'ee72e10436f1462884d9c54065e1782b';
const redirectUri = 'http://localhost:3000/';
let accessToken = '';

export const getAccessToken = () => {
    if (accessToken) {
        return Promise.resolve(accessToken);
    }

    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (urlAccessToken && urlExpiresIn) {
        accessToken = urlAccessToken[1];
        const expiresIn = Number(urlExpiresIn[1]);

        window.setTimeout(() => {
            accessToken = '';
            localStorage.removeItem('accessToken'); // Clear token from localStorage when it expires
        }, expiresIn * 1000);

        localStorage.setItem('accessToken', accessToken); // Save token to localStorage
        window.history.pushState('Access Token', null, '/');

        return Promise.resolve(accessToken);
    } else {
        return;
    }
};


export const signIn = () => {
    const redirect = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public%20user-read-recently-played&redirect_uri=${redirectUri}`;
    window.location = redirect;
    return new Promise(() => { });
};

export const search = async (term) => {
    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data via Search from Spotify API');
        }

        const jsonResponse = await response.json();

        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            image: track.album.images[1].url,
            preview: track.preview_url,
        }));
    } catch (error) {
        console.error('Error during search:', error);
        return [];
    }
};

export const savePlaylist = async (name, trackUris) => {
    try {
        const accessToken = await getAccessToken();
        const userResponse = await fetch("https://api.spotify.com/v1/me", { headers: { Authorization: `Bearer ${accessToken}` } });

        if (!userResponse.ok) {
            throw new Error(`Failed to retrieve user ID: ${userResponse.statusText}`);
        }

        const userJsonResponse = await userResponse.json();
        const userId = userJsonResponse.id;

        const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name }),
        });

        if (!createPlaylistResponse.ok) {
            throw new Error(`Failed to create playlist: ${createPlaylistResponse.statusText}`);
        }

        const createPlaylistJsonResponse = await createPlaylistResponse.json();
        const playlistId = createPlaylistJsonResponse.id;

        const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uris: trackUris }),
        });

        if (!addTracksResponse.ok) {
            const errorResponse = await addTracksResponse.json();
            throw new Error(`Failed to add tracks to playlist: ${errorResponse.error.message}`);
        }

        const addTracksJsonResponse = await addTracksResponse.json();
    } catch (error) {
        console.error("Error in savePlaylist:", error);
        throw error;
    }
};


export const getLastPlayedTracks = async () => {
    try {
        const accessToken = await getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recently played tracks from Spotify API');
        }

        const jsonResponse = await response.json();

        if (!jsonResponse.items) {
            return [];
        }


        // Transform the items and ensure all accesses are safe

        console.log(jsonResponse);
        return jsonResponse.items.map(item => {
            const track = item.track;
            // Ensure the track, artists, and album are as expected
            if (!track || !track.artists || track.artists.length === 0 || !track.album) {
                console.error('Unexpected track data structure:', track);
                return null;
            }

            // Safely access the image URL
            const imageUrl = track.album.images && track.album.images.length > 1 ? track.album.images[1].url : null;

            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
                image: imageUrl,
                preview: track.preview_url,
            };
        }).filter(item => item !== null); // Filter out any null items
    } catch (error) {
        console.error('Error during fetching recently played songs:', error);
        return [];
    }
};
