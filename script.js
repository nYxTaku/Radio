document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Fetch song data from JSON file
    const response = await fetch("radio_data.json");
    const songsData = await response.json();

    // Populate Playlist
    const playlistItemsElement = document.getElementById("playlistItems");
    songsData.forEach((song) => {
      const li = document.createElement("li");
      li.textContent = `${song.title} - ${song.artist} (${song.album})`;
      playlistItemsElement.appendChild(li);
    });

    const audioPlayer = document.getElementById("audioPlayer");
    let currentSongIndex = 0;

    // Function to play the next audio
    function playNextSong() {
      if (currentSongIndex < songsData.length) {
        const currentSong = songsData[currentSongIndex];
        console.log("Playing:", currentSong.title); // Log current song
        audioPlayer.src = `AudioFiles/${currentSong.audioFile}`;
        audioPlayer.play();
        currentSongIndex++;

        // Update the nowPlaying div
        const nowPlayingElement = document.getElementById("nowPlaying");
        nowPlayingElement.textContent = `${currentSong.title} - ${currentSong.artist}`;
      } else {
        console.log("End of playlist. Restarting."); // Log end of playlist
        // Reset the index to play the playlist again
        currentSongIndex = 0;
        playNextSong(); // Start playing from the beginning
      }
    }

    // Play the first audio
    playNextSong();

    // Event listener for when the current audio ends
    audioPlayer.addEventListener("ended", playNextSong);

    // Sample chat data
    const chatData = ["huntarex: Hello!", "Super: Hey there!", "RandomUser1: Best Website ever!", "Super: The vibe is real", "RandomUser2: Banger songs fr fr",
                      "nYx: Are you going to update?", "RandomUser3: I've been here for 5 hours","huntarex: Why is this so good!!"];
    const chatContainer = document.getElementById("chatContainer");

    // Function to append a chat message to the container
    function appendChatMessage(message) {
      const div = document.createElement("div");
      div.classList.add("message");
      div.textContent = message;
      chatContainer.appendChild(div);

      // Remove excess chat messages
      if (chatContainer.children.length > 10) {
        chatContainer.removeChild(chatContainer.firstChild);
      }
    }

    // Auto-scrolling behavior
    const scrollSpeed = 1;
    let scrollInterval = null;

    function startScrolling() {
      scrollInterval = setInterval(function () {
        chatContainer.scrollTop += scrollSpeed;
        if (chatContainer.scrollTop >= chatContainer.scrollHeight - chatContainer.clientHeight) {
          const randomMessage = chatData[Math.floor(Math.random() * chatData.length)];
          appendChatMessage(randomMessage);
          chatContainer.scrollTop = 0;
        }
      }, 300);
    }

    function stopScrolling() {
      clearInterval(scrollInterval);
    }

    startScrolling();

    chatContainer.addEventListener("mouseover", stopScrolling);
    chatContainer.addEventListener("mouseout", startScrolling);

  } catch (error) {
    console.error("Error:", error);
  }
});
