/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

declare global {
  export interface AuthorsDataItem {
    country?: string;
    github?: string;
    glitch?: string;
    homepage?: string;
    image?: string;
    twitter?: string;
  };

  export interface AuthorsData {
    [key: string]: AuthorsDataItem;
  };

  export interface AuthorsItem extends VirtualCollectionItem, AuthorsDataItem {}

  export interface Authors {
    [key: string]: AuthorsItem;
  }
}

// empty export to keep file a module
export {};
