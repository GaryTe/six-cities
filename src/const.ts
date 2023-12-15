export const Address = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Room: '/offer/',
  Error: '*'
} as const;

export const isAuthorizationStatus = false;

export const UserStatus = {
  SignIn: 'Sign in',
  SingOut: 'Sign out'
} as const;

export const CitiesList = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export const NameSortList = {
  Popular: 'Popular',
  'Price: low to high': 'Price: low to high',
  'Price: high to low': 'Price: high to low',
  'Top rated first': 'Top rated first'
} as const;

export const ValueKey = {
  Price: 'price',
  Rating: 'rating'
} as const;

export const NameReducer = {
  Offers: 'offers',
  Reviews: 'reviews'
} as const;

export const Rating = {
  Perfect: 'perfect',
  Good: 'good',
  'Not bad': 'not bad',
  Badly: 'badly',
  Terribly: 'terribly'
} as const;
