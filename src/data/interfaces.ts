/**
 * I N T E R F A C E S
 */

import React from "react";
import { ROUTES, ROUTE_KEYS } from "./enum";

/**
 * Interface that representa the data needed to "create" a route and
 * the respective page associated to it
 *
 * @interface
 * @alias Page
 *
 * @category Interface
 * @subcategory General
 */
export interface Page {
  /** The route must be exactly right in order to be accessed */
  //exact: boolean;
  /** The relative path of the route */
  path: ROUTES;
  /** The key or UUID that identifies uniquely the route (more human readable) */
  key: ROUTE_KEYS;
  /** The component to be mounted for that route */
  component: React.FC;
  /** The layout to be used for that route (TODO ?)*/
  //layout: React.FC;
  /** Optional icon for the Route in presence of link to it (e.g. Drawer/Tabs) */
  icon?: string;
  /** Nested route that extends the current one */
  //nested?: Array<Page>;
}

/**
 * Interface that representa the data TODO
 *
 * @interface
 * @alias AuthUser
 *
 * @category Interface
 * @subcategory General
 */
 export interface AuthUser {
  /** Since the field is not required could be null (fallback to username) */
  firstname?: string;
  /** Since the field is not required could be null (fallback to username) */
  lastname?: string;
  /** The authUser uername, defined during SignUp */
  username: string;
  /** The email used for the Sign Up/In flow */
  email: string;
  /** The uuid of the current AuthUser */
  id: string;
}

/**
 * Interface that representa the data TODO
 *
 * @interface
 * @alias Product
 *
 * @category Interface
 * @subcategory General
 */
export interface Product {
  /** The name of the product */
  name: string;
  /** A brief description about the product */
  description: string;
  /** The quantity left in the user's pantry */
  quantity: number;
  /** The barcode/id f the product */
  barcode: number;
}
