import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the search bar', () => {
    render(<App />);
    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();
  });

  test('renders the search results', () => {
    render(<App />);
    const searchResults = screen.getByRole('list');
    expect(searchResults).toBeInTheDocument();
  });

  test('renders the playlist', () => {
    render(<App />);
    const playlist = screen.getByRole('list', { name: 'Playlist' });
    expect(playlist).toBeInTheDocument();
  });

  test('adds a track to the playlist', () => {
    render(<App />);
    const searchResults = screen.getByRole('list');
    const firstTrack = searchResults.firstChild;
    const playlist = screen.getByRole('list', { name: 'Playlist' });
    fireEvent.click(firstTrack.querySelector('button'));
    expect(playlist).toContainElement(firstTrack);
  });

  test('removes a track from the playlist', () => {
    render(<App />);
    const playlist = screen.getByRole('list', { name: 'Playlist' });
    const firstTrack = playlist.firstChild;
    fireEvent.click(firstTrack.querySelector('button'));
    expect(playlist).not.toContainElement(firstTrack);
  });

  test('updates the playlist name', () => {
    render(<App />);
    const playlistNameInput = screen.getByDisplayValue('Your Playlist');
    fireEvent.change(playlistNameInput, { target: { value: 'My Playlist' } });
    expect(playlistNameInput).toHaveValue('My Playlist');
  });

  test('saves the playlist', () => {
    render(<App />);
    const saveButton = screen.getByRole('button', { name: 'Save to Spotify' });
    fireEvent.click(saveButton);
    const playlist = screen.getByRole('list', { name: 'Playlist' });
    expect(playlist).toBeEmptyDOMElement();
  });
});