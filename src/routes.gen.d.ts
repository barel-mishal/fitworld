///////////////////////////////////////////////////////////////////////////
/// GENERATED FILE --- DO NOT EDIT --- YOUR CHANGES WILL BE OVERWRITTEN ///
///////////////////////////////////////////////////////////////////////////

export type AppRoutes =
  | "/"
  | "/auth/new-user/"
  | "/auth/signin/"
  | "/auth/signout/"
  | "/auth/verify-request/"
  | "/bento/"
  | "/client/"
  | "/client/(main)/leaderBoard/"
  | "/client/(main)/play/"
  | "/client/(main)/play/[section]/"
  | "/client/(main)/play/[section]/[unit]/"
  | "/client/(main)/play/finish/"
  | "/client/(main)/track/"
  | "/client/(main)/track/finish/"
  | "/client/(main)/user/"
  | "/client/Assessment/"
  | "/client/Assessment/activity-level/"
  | "/client/Assessment/lifestyleFactors/"
  | "/client/Assessment/personalInformation/"
  | "/client/Assessment/personalInformation/DateofBirth/"
  | "/client/Assessment/personalInformation/current-weight/"
  | "/client/Assessment/personalInformation/gender/"
  | "/client/Assessment/personalInformation/goals/"
  | "/client/Assessment/personalInformation/height/"
  | "/client/Assessment/personalInformation/name/"
  | "/construction/"
  | "/content/"
  | "/dashboard/"
  | "/dashboard/feed/"
  | "/dashboard/notes/"
  | "/dashboard/notes/[id]/"
  | "/dashboard/notes/new/"
  | "/dashboard/profile/"
  | "/dashboard/profile/settings/"
  | "/dashboard/settings/"
  | "/seedDatabase/";

export interface AppRouteMap {
  "/": {};
  "/auth/new-user/": {};
  "/auth/signin/": {};
  "/auth/signout/": {};
  "/auth/verify-request/": {};
  "/bento/": {};
  "/client/": {};
  "/client/(main)/leaderBoard/": {};
  "/client/(main)/play/": {};
  "/client/(main)/play/[section]/": { section: string };
  "/client/(main)/play/[section]/[unit]/": { section: string; unit: string };
  "/client/(main)/play/finish/": {};
  "/client/(main)/track/": {};
  "/client/(main)/track/finish/": {};
  "/client/(main)/user/": {};
  "/client/Assessment/": {};
  "/client/Assessment/activity-level/": {};
  "/client/Assessment/lifestyleFactors/": {};
  "/client/Assessment/personalInformation/": {};
  "/client/Assessment/personalInformation/DateofBirth/": {};
  "/client/Assessment/personalInformation/current-weight/": {};
  "/client/Assessment/personalInformation/gender/": {};
  "/client/Assessment/personalInformation/goals/": {};
  "/client/Assessment/personalInformation/height/": {};
  "/client/Assessment/personalInformation/name/": {};
  "/construction/": {};
  "/content/": {};
  "/dashboard/": {};
  "/dashboard/feed/": {};
  "/dashboard/notes/": {};
  "/dashboard/notes/[id]/": { id: string };
  "/dashboard/notes/new/": {};
  "/dashboard/profile/": {};
  "/dashboard/profile/settings/": {};
  "/dashboard/settings/": {};
  "/seedDatabase/": {};
}

export interface AppRouteParamsFunction {
  (route: "/", params?: {}): string;
  (route: "/auth/new-user/", params?: {}): string;
  (route: "/auth/signin/", params?: {}): string;
  (route: "/auth/signout/", params?: {}): string;
  (route: "/auth/verify-request/", params?: {}): string;
  (route: "/bento/", params?: {}): string;
  (route: "/client/", params?: {}): string;
  (route: "/client/(main)/leaderBoard/", params?: {}): string;
  (route: "/client/(main)/play/", params?: {}): string;
  (
    route: "/client/(main)/play/[section]/",
    params: { section: string },
  ): string;
  (
    route: "/client/(main)/play/[section]/[unit]/",
    params: { section: string; unit: string },
  ): string;
  (route: "/client/(main)/play/finish/", params?: {}): string;
  (route: "/client/(main)/track/", params?: {}): string;
  (route: "/client/(main)/track/finish/", params?: {}): string;
  (route: "/client/(main)/user/", params?: {}): string;
  (route: "/client/Assessment/", params?: {}): string;
  (route: "/client/Assessment/activity-level/", params?: {}): string;
  (route: "/client/Assessment/lifestyleFactors/", params?: {}): string;
  (route: "/client/Assessment/personalInformation/", params?: {}): string;
  (
    route: "/client/Assessment/personalInformation/DateofBirth/",
    params?: {},
  ): string;
  (
    route: "/client/Assessment/personalInformation/current-weight/",
    params?: {},
  ): string;
  (
    route: "/client/Assessment/personalInformation/gender/",
    params?: {},
  ): string;
  (route: "/client/Assessment/personalInformation/goals/", params?: {}): string;
  (
    route: "/client/Assessment/personalInformation/height/",
    params?: {},
  ): string;
  (route: "/client/Assessment/personalInformation/name/", params?: {}): string;
  (route: "/construction/", params?: {}): string;
  (route: "/content/", params?: {}): string;
  (route: "/dashboard/", params?: {}): string;
  (route: "/dashboard/feed/", params?: {}): string;
  (route: "/dashboard/notes/", params?: {}): string;
  (route: "/dashboard/notes/[id]/", params: { id: string }): string;
  (route: "/dashboard/notes/new/", params?: {}): string;
  (route: "/dashboard/profile/", params?: {}): string;
  (route: "/dashboard/profile/settings/", params?: {}): string;
  (route: "/dashboard/settings/", params?: {}): string;
  (route: "/seedDatabase/", params?: {}): string;
}

export type AppLinkProps =
  | { route: "/" }
  | { route: "/auth/new-user/" }
  | { route: "/auth/signin/" }
  | { route: "/auth/signout/" }
  | { route: "/auth/verify-request/" }
  | { route: "/bento/" }
  | { route: "/client/" }
  | { route: "/client/(main)/leaderBoard/" }
  | { route: "/client/(main)/play/" }
  | { route: "/client/(main)/play/[section]/"; "param:section": string }
  | {
      route: "/client/(main)/play/[section]/[unit]/";
      "param:section": string;
      "param:unit": string;
    }
  | { route: "/client/(main)/play/finish/" }
  | { route: "/client/(main)/track/" }
  | { route: "/client/(main)/track/finish/" }
  | { route: "/client/(main)/user/" }
  | { route: "/client/Assessment/" }
  | { route: "/client/Assessment/activity-level/" }
  | { route: "/client/Assessment/lifestyleFactors/" }
  | { route: "/client/Assessment/personalInformation/" }
  | { route: "/client/Assessment/personalInformation/DateofBirth/" }
  | { route: "/client/Assessment/personalInformation/current-weight/" }
  | { route: "/client/Assessment/personalInformation/gender/" }
  | { route: "/client/Assessment/personalInformation/goals/" }
  | { route: "/client/Assessment/personalInformation/height/" }
  | { route: "/client/Assessment/personalInformation/name/" }
  | { route: "/construction/" }
  | { route: "/content/" }
  | { route: "/dashboard/" }
  | { route: "/dashboard/feed/" }
  | { route: "/dashboard/notes/" }
  | { route: "/dashboard/notes/[id]/"; "param:id": string }
  | { route: "/dashboard/notes/new/" }
  | { route: "/dashboard/profile/" }
  | { route: "/dashboard/profile/settings/" }
  | { route: "/dashboard/settings/" }
  | { route: "/seedDatabase/" };
