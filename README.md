This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## running the UI

Matter of fact the only working script is `npm start`.
So to get the UI working please:

```
npm i
npm start
```

The port is changed to 3500, so expect it appear at [http://localhost:3500](http://localhost:3500).

## unconvenient behavior corners

### lame seeded videos
The server part seeds only the metadata for couple of video entries, that is why thumbnails/videos won't work for those.
Please remove the seeded ones and upload yours, that should work just fine

### no ffmpeg
If you did not install ffmpeg you may make the backend work without thumbnail generation (see its readme, please). In that case UI would look lame-ish, but still would be working.

## things which were not done

What is not done - is omitted due to 'complete as much as you can' or because i did not find a way to do something. Let me though at least mention some thoughts.

Also i have not beed doing frontend stuff for quite a long time (last time i did things react was v.15). And frontend, especially markup is not my primary specialization.

### tests
I am not experienced with testing the frontend, i took a look at how it is supposed to be but it is not a subject to get obvious at once

### forms and validation
Last time i've been doing frontend stuff i was using `final-form` to compose forms. I wanted to give it a try to get cleaner design, validation, visualizing validation errors and stuff. I've tried to adopt it here but it did not swallow Bootstrap inputs i've used from scratch. And introducing custom field components and knitting all that things together seemed to be realy huge overhead for this 4 inputs so i just left it as is.
In fact there's a `wrong-way-final-forms` branch with that tries but i don't know if that's worth taking a look.

### graphQL to React
I saw there is a way to kinda inject graphQL query execution into React components like mentioned in:
https://www.apollographql.com/docs/tutorial/client/
I gave it a try, but found out that it requires using Apollo Graph Manager to deliver schema to client. Also, artifacts brought by this approach did not look that benefitial to convince me to use it.

### graphQL cache
I am absolute novice in graphQL, so when i found out that when i mutate data adding videos - they don't get cached in the client - i've disabled the client graphQL cache (i am talking specifically about query listing the videos). I do understand that the schema is supposed to be consistent and probably even synced with different sources like websockets but in this zero approximation i did not find any easy way to configure that caching.


### video/mp4 mime expected
When i designed the data schema i omitted storing mime type of videos. In fact now i hesitate to change the schema and introduce that mime type property. But it seems i've accomplished just the same refactoring when changing `path/filename` fields for videos and introduced thumbnail paths. I don't think that refactoring this aspect will tell you anything new about my skills. So please operate mp4 videos just in case, i myself dowloaded few coubs and that was enough for me to get through testing.
