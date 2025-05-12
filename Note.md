useMutation: Handles API mutations (POST, PUT, DELETE)
useQueryClient: Manages React Query's cache
mutate: Function to trigger login
mutationFn: Actual API call function

const onSubmit: SubmitHandler<LoginInputs> = (data) => {
  login(
    { email: data.email, password: data.password },
    {
      onSettled: () => {
        // This runs after login attempt completes (success or failure)
        reset(); // Reset form
        // Clean up loading states
        // Clear sensitive data
        // Any cleanup tasks
      }
    }
  );
};

login(
  { email, password },
  {
    onSuccess: (data) => {
      // Runs on successful login
      console.log('Login successful', data);
    },
    onError: (error) => {
      // Runs when login fails
      console.error('Login failed', error);
    },
    onSettled: () => {
      // Runs in both success and error cases
      console.log('Login attempt completed');
    }
  }
);

## Accessibility
To get this displayed along with the HTML media playback, you need to:

Save it as a .vtt file in a sensible place.
Link to the .vtt file with the <track> element. <track> should be placed within <audio> or <video>, but after all <source> elements. Use the kind attribute to specify whether the cues are subtitles, captions, or descriptions. Furthermore, use srclang to tell the browser what language you have written the subtitles in.

```<video controls>
  <source src="example.mp4" type="video/mp4" />
  <source src="example.webm" type="video/webm" />
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en" />
</video>
```

Include a transcript on the same page
```<audio controls>
  <source src="viper.mp3" type="audio/mp3" />
  <p>Your browser doesn't support HTML audio. Here is a <a href="viper.mp3">link to the audio</a>.</p>
</audio>
<p>Transcript: The audio explains how to create accessible multimedia content.</p>```

Or link to a separate transcript page
```<p><a href="transcript.html">Read the full transcript</a>.</p>```

Automated services like YouTube captions or tools like Trint can generate transcripts, but quality may vary