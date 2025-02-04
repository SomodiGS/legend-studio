/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { type Hashable, hashArray } from '@finos/legend-shared';
import { PERSISTENCE_HASH_STRUCTURE } from '../../../../../../../graph/DSL_Persistence_HashUtils.js';

export abstract class V1_Deduplication implements Hashable {
  abstract get hashCode(): string;
}

export class V1_NoDeduplication extends V1_Deduplication {
  override get hashCode(): string {
    return hashArray([PERSISTENCE_HASH_STRUCTURE.NO_DEDUPLICATION]);
  }
}

export class V1_AnyVersion extends V1_Deduplication {
  override get hashCode(): string {
    return hashArray([PERSISTENCE_HASH_STRUCTURE.ANY_VERSION]);
  }
}

export abstract class V1_MaxVersion extends V1_Deduplication {}

export class V1_MaxVersionForGraphFetch extends V1_MaxVersion {
  override get hashCode(): string {
    return hashArray([PERSISTENCE_HASH_STRUCTURE.MAX_VERSION_FOR_GRAPH_FETCH]);
  }
}

export class V1_MaxVersionForTds extends V1_MaxVersion {
  versionField!: string;

  override get hashCode(): string {
    return hashArray([
      PERSISTENCE_HASH_STRUCTURE.MAX_VERSION_FOR_TDS,
      this.versionField,
    ]);
  }
}
