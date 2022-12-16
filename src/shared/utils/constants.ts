//export const PROD_URL = "https://friendin-deed.herokuapp.com/api/v1/"

//export const STAGING_URL = "http://localhost:5000/api/v1"
export const PROD_URL = "http://localhost:5000/api/v1"
export const STAGING_URL = "http://localhost:5000/api/v1"
export const ENV = process.env.REACT_APP_ENV
export const STORAGE_KEY_CONSTANT = "friendindeed_token"

export const STORAGE_USER_CONSTANT = "friendindeed_user"

export const GOOGLE_CLIENTID = process.env.REACT_APP_GOOGLE_CLIENTID

export const LOGO_URL =
  "https://res.cloudinary.com/friendindeed/image/upload/v1642823421/FI_Logo.png"

export const DEFAULT_PROFILE_URL =
  "https://avatars.dicebear.com/api/miniavs/shreya-happy.svg"

export const CLOUDINARY_URL =
  "cloudinary://437741655674911:BJk-ociOBpdvGhtYgiRWegpqitU@friendindeed"

export enum ROUTES {
  HOME = "",
  DASHBOARD = "dashboard",
  LOGIN = "login",
  MY_PROFILE = "profile",
  MY_SESSIONS = "sessions",
  MY_CHATS = "chats",
  PRESCRIBE_TREATMENT = "prescribe-treatment",
  FRIEND_IN_NEED = "friend-in-need"
}

export const  emojiMap = new Map<number, any>([
  [1,"😄"  ],
  [2,"😊"  ],
  [3,"😶" ],
  [4,"🙁" ],
  [5,"😢" ]
]);

export const ratingsOptions = [
  { label: "1", code: "1", value: 1 },
  { label: "2", code: "2", value: 2 },
  { label: "3", code: "3", value: 3 },
  { label: "4", code: "4", value: 4 },
  { label: "5", code: "5", value: 5 },
]

export const experiencesOptions = [
  { label: "Below 5 years", code: "5", value: 5 },
  { label: "Below 8 years", code: "5", value: 8 },
  { label: "Below 10 years", code: "10", value: 10 },
  { label: "Below 15 years", code: "15", value: 15 },
  { label: "Below 20 years", code: "20", value: 20 },
]

export const feesOptions = [
  { label: "Under  \u20b9 500", code: "500", value: 500 },
  { label: "Under  \u20b9 800", code: "800", value: 800 },
  { label: "Under  \u20b9 1000", code: "1000", value: 1000 },
  { label: "Under  \u20b9 1500", code: "1500", value: 1500 },
]
