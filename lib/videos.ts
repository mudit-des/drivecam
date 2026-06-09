export interface PlaylistVideo {
  videoId: string;
  title: string;
  url: string;
  categoryId?: string;
}

export interface VideoCategory {
  id: string;
  label: string;
}

export const PLAYLIST_ID = "PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v";
export const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}`;
export const CHANNEL_NAME = "ACKO India";
export const PLAYLIST_TITLE = "DriveCam";

export const SETUP_VIDEOS: PlaylistVideo[] = [
  {
    videoId: "tbpyJ2p2Za4",
    title: "Install your DriveCam",
    url: "https://www.youtube.com/watch?v=tbpyJ2p2Za4&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=20",
  },
  {
    videoId: "sazSnnQwqdU",
    title: "Connect your phone to DriveCam",
    url: "https://www.youtube.com/watch?v=sazSnnQwqdU&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=15",
  },
  {
    videoId: "DT-IwblEBb0",
    title: "Update DriveCam firmware",
    url: "https://www.youtube.com/watch?v=DT-IwblEBb0&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=16",
  },
  {
    videoId: "9P1XmpHbrWA",
    title: "Set the right date and time",
    url: "https://www.youtube.com/watch?v=9P1XmpHbrWA&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=14",
  },
  {
    videoId: "wFaCc4hY9A0",
    title: "Insert or remove the SD card",
    url: "https://www.youtube.com/watch?v=wFaCc4hY9A0&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=17",
  },
  {
    videoId: "Cf2f_BPdlSI",
    title: "Re-fit the DriveCam mount",
    url: "https://www.youtube.com/watch?v=Cf2f_BPdlSI&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=13",
  },
];

export const TROUBLESHOOTING_CATEGORIES: VideoCategory[] = [
  { id: "all",         label: "All"                      },
  { id: "power",       label: "Device won't turn on"     },
  { id: "wifi",        label: "Wi-Fi isn't connecting"   },
  { id: "playback",    label: "Videos won't load"        },
  { id: "recordings",  label: "Recordings missing"       },
  { id: "overheating", label: "Device overheating"       },
];

export const TROUBLESHOOTING_VIDEOS: PlaylistVideo[] = [
  {
    videoId: "r7sTmhRJu5I",
    title: "Audio isn't recording? Here's how to fix it",
    categoryId: "recordings",
    url: "https://www.youtube.com/watch?v=r7sTmhRJu5I&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=1",
  },
  {
    videoId: "alZgdvOgjNg",
    title: "Wi-Fi LED stays red? Here's how to fix it",
    categoryId: "wifi",
    url: "https://www.youtube.com/watch?v=alZgdvOgjNg&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=2",
  },
  {
    videoId: "yOgsQnP_SR8",
    title: "Video keeps buffering? Here's how to fix it",
    categoryId: "playback",
    url: "https://www.youtube.com/watch?v=yOgsQnP_SR8&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=3",
  },
  {
    videoId: "aYNNnolazzM",
    title: "DriveCam not turning on? Here's how to fix it",
    categoryId: "power",
    url: "https://www.youtube.com/watch?v=aYNNnolazzM&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=6",
  },
  {
    videoId: "2jyhQfQr0jo",
    title: "DriveCam overheating? Here's how to cool it down",
    categoryId: "overheating",
    url: "https://www.youtube.com/watch?v=2jyhQfQr0jo&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=7",
  },
  {
    videoId: "iKDY17o5nfI",
    title: "Trips not loading? Here's how to fix it",
    categoryId: "playback",
    url: "https://www.youtube.com/watch?v=iKDY17o5nfI&list=PLwzz_zke1UI3X_NNddlwYC9JLM-U_T63v&index=11",
  },
];
