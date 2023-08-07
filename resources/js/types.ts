type DateTime = string;

export type Nullable<T> = T | null;

export interface Team {
  id: number;
  name: string;
  personal_team: boolean;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface User {
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
}

export interface Auth {
  user: Nullable<
    User & {
      all_teams?: Team[];
      current_team?: Team;
    }
  >;
}

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

export interface Session {
  id: number;
  ip_address: string;
  is_current_device: boolean;
  agent: {
    is_desktop: boolean;
    platform: string;
    browser: string;
  };
  last_active: DateTime;
}

export interface ApiToken {
  id: number;
  name: string;
  abilities: string[];
  last_used_ago: Nullable<DateTime>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface JetstreamTeamPermissions {
  canAddTeamMembers: boolean;
  canDeleteTeam: boolean;
  canRemoveTeamMembers: boolean;
  canUpdateTeam: boolean;
}

export interface Role {
  key: string;
  name: string;
  permissions: string[];
  description: string;
}

export interface TeamInvitation {
  id: number;
  team_id: number;
  email: string;
  role: Nullable<string>;
  created_at: DateTime;
  updated_at: DateTime;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PageLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: PageLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface DataWithItems<T> {
  items: T[];
  meta: Meta;
  links: Links;
}

interface DataWithItem<T> {
  item: T;
}

type DataResponse<T> = DataWithItems<T> | DataWithItem<T>;

interface ApiResponse<T> {
  data: DataResponse<T>;
}

interface ShowApiResponse<T> {
  data: DataWithItem<T>;
  code: number;
  locale: string;
  message: string;
  success: boolean;
}

export interface ShowRoomApiResponse extends ShowApiResponse<Room> {
  data: DataWithItem<Room>;
}

export interface Room {
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
}

export type Amenity = {
  name: string;
  label: string;
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

interface HateoasLink {
  href: string;
  rel: string;
  type: string;
}

interface Address {
  first_line: string;
  second_line: Nullable<string>;
  city: string;
  region: Nullable<string>;
  postcode: string;
  country: string;
}

export type Checkout = {
  stripe: {
    public_key: string;
    client_secret: string;
  };
  session_token: string;
};

interface RoomApiResponse extends ApiResponse<Room> {
  data: DataWithItems<Room>;
}

interface CheckoutApiResponse {
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
}
