type DateTime = string;

export type Nullable<T> = T | null;

export type Team = {
  id: number;
  name: string;
  personal_team: boolean;
  created_at: DateTime;
  updated_at: DateTime;
};

export type User = {
  id: number;
  name: string;
  email: string;
  current_team_id: Nullable<number>;
  profile_photo_path: Nullable<string>;
  profile_photo_url: string;
  two_factor_enabled: boolean;
  email_verified_at: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
};

export type Auth = {
  user: Nullable<
    User & {
      all_teams?: Team[];
      current_team?: Team;
    }
  >;
};

export type InertiaSharedProps<T = Record<string, unknown>> = T & {
  jetstream: {
    canCreateTeams: boolean;
    canManageTwoFactorAuthentication: boolean;
    canUpdatePassword: boolean;
    canUpdateProfileInformation: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    flash: any;
    hasAccountDeletionFeatures: boolean;
    hasApiFeatures: boolean;
    hasTeamFeatures: boolean;
    hasTermsAndPrivacyPolicyFeature: boolean;
    managesProfilePhotos: boolean;
    hasEmailVerification: boolean;
  };
  auth: Auth;
  rooms: RoomApiResponse;
  room: ShowRoomApiResponse;
  checkout: CheckoutApiResponse;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorBags: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
};

export type Session = {
  id: number;
  ip_address: string;
  is_current_device: boolean;
  agent: {
    is_desktop: boolean;
    platform: string;
    browser: string;
  };
  last_active: DateTime;
};

export type ApiToken = {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
};

export type JetstreamTeamPermissions = {
  canAddTeamMembers: boolean;
  canDeleteTeam: boolean;
  canRemoveTeamMembers: boolean;
  canUpdateTeam: boolean;
};

export type Role = {
  key: string;
  name: string;
  permissions: string[];
  description: string;
};

export type TeamInvitation = {
  id: number;
  team_id: number;
  email: string;
  role: Nullable<string>;
  created_at: DateTime;
  updated_at: DateTime;
};

export type Links = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PageLink = {
  url: string | null;
  Label: string;
  active: boolean;
};

export type Meta = {
  count: number;
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

type DataWithItems<T> = {
  items: T[];
  meta: Meta;
  links: Links;
};

type DataWithItem<T> = {
  item: T;
};

type DataResponse<T> = DataWithItems<T> | DataWithItem<T>;

type ApiResponse<T> = {
  data: DataResponse<T>;
};

type ShowApiResponse<T> = {
  data: DataWithItem<T>;
  code: number;
  locale: string;
  message: string;
  success: boolean;
};

export type ShowRoomApiResponse = ShowApiResponse<Room> & {
  data: DataWithItem<Room>;
};

export type Room = {
  id: string;
  operator_id: string;
  name: string;
  max_roms_left: number;
  is_available: boolean;
  price: string;
  is_estimated_price: boolean;
  cancellation: {
    visa_cancellation: boolean;
    uni_place_cancellation: boolean;
  };
  price_range: {
    min: string;
    max: string;
  };
  coordinates: {
    lat: string;
    long: string;
  };
  address: Address;
  summary: string;
  description: string;
  rich_description: string;
  amenities: {
    [key: string]: Amenity[];
  };
  currency: string;
  images: RoomImage[];
  property: {
    id: string;
    name: string;
    slug: string;
  };
  booking_periods: BookingPeriod[];
  universities: University[];
  _links: HateoasLink[];
};

export type Amenity = {
  name: string;
  Label: string;
  status: boolean;
};

export type DynamicImage = {
  small: string;
  small_plus: string;
  medium: string;
  large: string;
  alt?: string;
};

export type BookingPeriod = {
  id: string;
  start_date: string;
  end_date: string;
  holding_deposit: string;
  price_per_week: string;
  maximum_bookings: number;
};

type University = {
  name: string;
  distance: number;
  walk: string;
  drive: string;
  metric_unit: string;
  coordinates: {
    lat: string;
    long: string;
  };
};

type RoomImage = {
  large: string;
  medium: string;
  small: string;
  small_plus: string;
};

type HateoasLink = {
  href: string;
  rel: string;
  type: string;
};

type Address = {
  first_line: string;
  second_line: Nullable<string>;
  city: string;
  region: Nullable<string>;
  postcode: string;
  country: string;
};

export type Checkout = {
  stripe: {
    public_key: string;
    client_secret: string;
  };
  session_token: string;
};

type RoomApiResponse = ApiResponse<Room> & {
  data: DataWithItems<Room>;
};

type CheckoutApiResponse = {
  data: {
    stripe: {
      public_key: string;
      client_secret: string;
    };
    session_token: string;
    room_id: string;
  };
  code: number;
  locale: string;
  message: string;
  success: boolean;
};
