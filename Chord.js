// Prompt the user for permission to access their microphone
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    // Create an audio context
    const audioContext = new AudioContext();
    // Create a media stream source node from the microphone input
    const sourceNode = audioContext.createMediaStreamSource(stream);
    // Connect the source node to an audio destination (e.g. speakers)
    sourceNode.connect(audioContext.destination);
  })
  .catch(error => {
    console.error('Error accessing microphone:', error);
  });


function suggestMelodyForChord(inputChord) {
  // Initialize an array to hold the scores for each chord
  const scores = [];

  // Loop through the chords and calculate the score for each one
  for (const chord of chords) {
    // Initialize the score to 0
    let score = 0;

    // Compare the notes in the chords and assign a score based on how many matching notes there are
    for (const note of inputChord.notes) {
      if (chord.notes.includes(note)) {
        score++;
      }
    }

    // Add the score to the scores array
    scores.push({ chord: chord, score: score });
  }

  // Sort the scores array in descending order based on the score
  scores.sort((a, b) => b.score - a.score);

  // Choose the top-scoring chord(s)
  const topChords = scores.filter(score => score.score === scores[0].score).map(score => score.chord);

  // Play a short melody using the audio file(s) associated with the top-scoring chord(s)
  for (const chord of topChords) {
    if (chord.audioFile) {
      // Play the audio file for the chord
      console.log(`Playing melody with chord "${chord.name}" (${chord.audioFile})`);
    } else {
      // No audio file is available for the chord
      console.log(`No audio file available for chord "${chord.name}"`);
    }
  }
}
