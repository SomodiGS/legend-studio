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
import type { V1_EmptyDatasetHandling } from './V1_DSL_Persistence_EmptyDatasetHandling.js';

export abstract class V1_Partitioning implements Hashable {
  abstract get hashCode(): string;
}

export class V1_NoPartitioning extends V1_Partitioning {
  emptyDatasetHandling!: V1_EmptyDatasetHandling;

  override get hashCode(): string {
    return hashArray([
      PERSISTENCE_HASH_STRUCTURE.NO_PARTITIONING,
      this.emptyDatasetHandling,
    ]);
  }
}

export abstract class V1_FieldBased extends V1_Partitioning {}

export class V1_FieldBasedForGraphFetch extends V1_FieldBased {
  override get hashCode(): string {
    return hashArray([PERSISTENCE_HASH_STRUCTURE.FIELD_BASED_FOR_GRAPH_FETCH]);
  }
}

export class V1_FieldBasedForTds extends V1_FieldBased {
  partitionFields: string[] = [];

  override get hashCode(): string {
    return hashArray([
      PERSISTENCE_HASH_STRUCTURE.FIEDD_BASED_FOR_TDS,
      hashArray(this.partitionFields),
    ]);
  }
}
