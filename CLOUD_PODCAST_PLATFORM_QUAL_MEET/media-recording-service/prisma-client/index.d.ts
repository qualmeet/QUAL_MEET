
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model RoomRecording
 * 
 */
export type RoomRecording = $Result.DefaultSelection<Prisma.$RoomRecordingPayload>
/**
 * Model Recording
 * 
 */
export type Recording = $Result.DefaultSelection<Prisma.$RecordingPayload>
/**
 * Model RecordingChunk
 * 
 */
export type RecordingChunk = $Result.DefaultSelection<Prisma.$RecordingChunkPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const RecordingStatus: {
  RECORDING: 'RECORDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type RecordingStatus = (typeof RecordingStatus)[keyof typeof RecordingStatus]

}

export type RecordingStatus = $Enums.RecordingStatus

export const RecordingStatus: typeof $Enums.RecordingStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RoomRecordings
 * const roomRecordings = await prisma.roomRecording.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more RoomRecordings
   * const roomRecordings = await prisma.roomRecording.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.roomRecording`: Exposes CRUD operations for the **RoomRecording** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomRecordings
    * const roomRecordings = await prisma.roomRecording.findMany()
    * ```
    */
  get roomRecording(): Prisma.RoomRecordingDelegate<ExtArgs>;

  /**
   * `prisma.recording`: Exposes CRUD operations for the **Recording** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recordings
    * const recordings = await prisma.recording.findMany()
    * ```
    */
  get recording(): Prisma.RecordingDelegate<ExtArgs>;

  /**
   * `prisma.recordingChunk`: Exposes CRUD operations for the **RecordingChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RecordingChunks
    * const recordingChunks = await prisma.recordingChunk.findMany()
    * ```
    */
  get recordingChunk(): Prisma.RecordingChunkDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    RoomRecording: 'RoomRecording',
    Recording: 'Recording',
    RecordingChunk: 'RecordingChunk'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "roomRecording" | "recording" | "recordingChunk"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      RoomRecording: {
        payload: Prisma.$RoomRecordingPayload<ExtArgs>
        fields: Prisma.RoomRecordingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomRecordingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomRecordingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload>
          }
          findFirst: {
            args: Prisma.RoomRecordingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomRecordingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload>
          }
          findMany: {
            args: Prisma.RoomRecordingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload>[]
          }
          create: {
            args: Prisma.RoomRecordingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload>
          }
          createMany: {
            args: Prisma.RoomRecordingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomRecordingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload>[]
          }
          delete: {
            args: Prisma.RoomRecordingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload>
          }
          update: {
            args: Prisma.RoomRecordingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload>
          }
          deleteMany: {
            args: Prisma.RoomRecordingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomRecordingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RoomRecordingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomRecordingPayload>
          }
          aggregate: {
            args: Prisma.RoomRecordingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomRecording>
          }
          groupBy: {
            args: Prisma.RoomRecordingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomRecordingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomRecordingCountArgs<ExtArgs>
            result: $Utils.Optional<RoomRecordingCountAggregateOutputType> | number
          }
        }
      }
      Recording: {
        payload: Prisma.$RecordingPayload<ExtArgs>
        fields: Prisma.RecordingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecordingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecordingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          findFirst: {
            args: Prisma.RecordingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecordingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          findMany: {
            args: Prisma.RecordingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>[]
          }
          create: {
            args: Prisma.RecordingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          createMany: {
            args: Prisma.RecordingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecordingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>[]
          }
          delete: {
            args: Prisma.RecordingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          update: {
            args: Prisma.RecordingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          deleteMany: {
            args: Prisma.RecordingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecordingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecordingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          aggregate: {
            args: Prisma.RecordingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecording>
          }
          groupBy: {
            args: Prisma.RecordingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecordingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecordingCountArgs<ExtArgs>
            result: $Utils.Optional<RecordingCountAggregateOutputType> | number
          }
        }
      }
      RecordingChunk: {
        payload: Prisma.$RecordingChunkPayload<ExtArgs>
        fields: Prisma.RecordingChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecordingChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecordingChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          findFirst: {
            args: Prisma.RecordingChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecordingChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          findMany: {
            args: Prisma.RecordingChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>[]
          }
          create: {
            args: Prisma.RecordingChunkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          createMany: {
            args: Prisma.RecordingChunkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecordingChunkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>[]
          }
          delete: {
            args: Prisma.RecordingChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          update: {
            args: Prisma.RecordingChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          deleteMany: {
            args: Prisma.RecordingChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecordingChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RecordingChunkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingChunkPayload>
          }
          aggregate: {
            args: Prisma.RecordingChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecordingChunk>
          }
          groupBy: {
            args: Prisma.RecordingChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecordingChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecordingChunkCountArgs<ExtArgs>
            result: $Utils.Optional<RecordingChunkCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RecordingCountOutputType
   */

  export type RecordingCountOutputType = {
    chunks: number
  }

  export type RecordingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | RecordingCountOutputTypeCountChunksArgs
  }

  // Custom InputTypes
  /**
   * RecordingCountOutputType without action
   */
  export type RecordingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingCountOutputType
     */
    select?: RecordingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecordingCountOutputType without action
   */
  export type RecordingCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingChunkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model RoomRecording
   */

  export type AggregateRoomRecording = {
    _count: RoomRecordingCountAggregateOutputType | null
    _min: RoomRecordingMinAggregateOutputType | null
    _max: RoomRecordingMaxAggregateOutputType | null
  }

  export type RoomRecordingMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    finalRoomUrl: string | null
    createdAt: Date | null
  }

  export type RoomRecordingMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    finalRoomUrl: string | null
    createdAt: Date | null
  }

  export type RoomRecordingCountAggregateOutputType = {
    id: number
    roomId: number
    userId: number
    finalRoomUrl: number
    createdAt: number
    _all: number
  }


  export type RoomRecordingMinAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    finalRoomUrl?: true
    createdAt?: true
  }

  export type RoomRecordingMaxAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    finalRoomUrl?: true
    createdAt?: true
  }

  export type RoomRecordingCountAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    finalRoomUrl?: true
    createdAt?: true
    _all?: true
  }

  export type RoomRecordingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomRecording to aggregate.
     */
    where?: RoomRecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomRecordings to fetch.
     */
    orderBy?: RoomRecordingOrderByWithRelationInput | RoomRecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomRecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomRecordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomRecordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomRecordings
    **/
    _count?: true | RoomRecordingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomRecordingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomRecordingMaxAggregateInputType
  }

  export type GetRoomRecordingAggregateType<T extends RoomRecordingAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomRecording]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomRecording[P]>
      : GetScalarType<T[P], AggregateRoomRecording[P]>
  }




  export type RoomRecordingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomRecordingWhereInput
    orderBy?: RoomRecordingOrderByWithAggregationInput | RoomRecordingOrderByWithAggregationInput[]
    by: RoomRecordingScalarFieldEnum[] | RoomRecordingScalarFieldEnum
    having?: RoomRecordingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomRecordingCountAggregateInputType | true
    _min?: RoomRecordingMinAggregateInputType
    _max?: RoomRecordingMaxAggregateInputType
  }

  export type RoomRecordingGroupByOutputType = {
    id: string
    roomId: string
    userId: string
    finalRoomUrl: string
    createdAt: Date
    _count: RoomRecordingCountAggregateOutputType | null
    _min: RoomRecordingMinAggregateOutputType | null
    _max: RoomRecordingMaxAggregateOutputType | null
  }

  type GetRoomRecordingGroupByPayload<T extends RoomRecordingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomRecordingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomRecordingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomRecordingGroupByOutputType[P]>
            : GetScalarType<T[P], RoomRecordingGroupByOutputType[P]>
        }
      >
    >


  export type RoomRecordingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    finalRoomUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["roomRecording"]>

  export type RoomRecordingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    finalRoomUrl?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["roomRecording"]>

  export type RoomRecordingSelectScalar = {
    id?: boolean
    roomId?: boolean
    userId?: boolean
    finalRoomUrl?: boolean
    createdAt?: boolean
  }


  export type $RoomRecordingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomRecording"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      userId: string
      finalRoomUrl: string
      createdAt: Date
    }, ExtArgs["result"]["roomRecording"]>
    composites: {}
  }

  type RoomRecordingGetPayload<S extends boolean | null | undefined | RoomRecordingDefaultArgs> = $Result.GetResult<Prisma.$RoomRecordingPayload, S>

  type RoomRecordingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomRecordingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomRecordingCountAggregateInputType | true
    }

  export interface RoomRecordingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomRecording'], meta: { name: 'RoomRecording' } }
    /**
     * Find zero or one RoomRecording that matches the filter.
     * @param {RoomRecordingFindUniqueArgs} args - Arguments to find a RoomRecording
     * @example
     * // Get one RoomRecording
     * const roomRecording = await prisma.roomRecording.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomRecordingFindUniqueArgs>(args: SelectSubset<T, RoomRecordingFindUniqueArgs<ExtArgs>>): Prisma__RoomRecordingClient<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RoomRecording that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RoomRecordingFindUniqueOrThrowArgs} args - Arguments to find a RoomRecording
     * @example
     * // Get one RoomRecording
     * const roomRecording = await prisma.roomRecording.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomRecordingFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomRecordingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomRecordingClient<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RoomRecording that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomRecordingFindFirstArgs} args - Arguments to find a RoomRecording
     * @example
     * // Get one RoomRecording
     * const roomRecording = await prisma.roomRecording.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomRecordingFindFirstArgs>(args?: SelectSubset<T, RoomRecordingFindFirstArgs<ExtArgs>>): Prisma__RoomRecordingClient<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RoomRecording that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomRecordingFindFirstOrThrowArgs} args - Arguments to find a RoomRecording
     * @example
     * // Get one RoomRecording
     * const roomRecording = await prisma.roomRecording.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomRecordingFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomRecordingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomRecordingClient<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RoomRecordings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomRecordingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomRecordings
     * const roomRecordings = await prisma.roomRecording.findMany()
     * 
     * // Get first 10 RoomRecordings
     * const roomRecordings = await prisma.roomRecording.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomRecordingWithIdOnly = await prisma.roomRecording.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomRecordingFindManyArgs>(args?: SelectSubset<T, RoomRecordingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RoomRecording.
     * @param {RoomRecordingCreateArgs} args - Arguments to create a RoomRecording.
     * @example
     * // Create one RoomRecording
     * const RoomRecording = await prisma.roomRecording.create({
     *   data: {
     *     // ... data to create a RoomRecording
     *   }
     * })
     * 
     */
    create<T extends RoomRecordingCreateArgs>(args: SelectSubset<T, RoomRecordingCreateArgs<ExtArgs>>): Prisma__RoomRecordingClient<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RoomRecordings.
     * @param {RoomRecordingCreateManyArgs} args - Arguments to create many RoomRecordings.
     * @example
     * // Create many RoomRecordings
     * const roomRecording = await prisma.roomRecording.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomRecordingCreateManyArgs>(args?: SelectSubset<T, RoomRecordingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomRecordings and returns the data saved in the database.
     * @param {RoomRecordingCreateManyAndReturnArgs} args - Arguments to create many RoomRecordings.
     * @example
     * // Create many RoomRecordings
     * const roomRecording = await prisma.roomRecording.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomRecordings and only return the `id`
     * const roomRecordingWithIdOnly = await prisma.roomRecording.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomRecordingCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomRecordingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RoomRecording.
     * @param {RoomRecordingDeleteArgs} args - Arguments to delete one RoomRecording.
     * @example
     * // Delete one RoomRecording
     * const RoomRecording = await prisma.roomRecording.delete({
     *   where: {
     *     // ... filter to delete one RoomRecording
     *   }
     * })
     * 
     */
    delete<T extends RoomRecordingDeleteArgs>(args: SelectSubset<T, RoomRecordingDeleteArgs<ExtArgs>>): Prisma__RoomRecordingClient<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RoomRecording.
     * @param {RoomRecordingUpdateArgs} args - Arguments to update one RoomRecording.
     * @example
     * // Update one RoomRecording
     * const roomRecording = await prisma.roomRecording.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomRecordingUpdateArgs>(args: SelectSubset<T, RoomRecordingUpdateArgs<ExtArgs>>): Prisma__RoomRecordingClient<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RoomRecordings.
     * @param {RoomRecordingDeleteManyArgs} args - Arguments to filter RoomRecordings to delete.
     * @example
     * // Delete a few RoomRecordings
     * const { count } = await prisma.roomRecording.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomRecordingDeleteManyArgs>(args?: SelectSubset<T, RoomRecordingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomRecordings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomRecordingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomRecordings
     * const roomRecording = await prisma.roomRecording.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomRecordingUpdateManyArgs>(args: SelectSubset<T, RoomRecordingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RoomRecording.
     * @param {RoomRecordingUpsertArgs} args - Arguments to update or create a RoomRecording.
     * @example
     * // Update or create a RoomRecording
     * const roomRecording = await prisma.roomRecording.upsert({
     *   create: {
     *     // ... data to create a RoomRecording
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomRecording we want to update
     *   }
     * })
     */
    upsert<T extends RoomRecordingUpsertArgs>(args: SelectSubset<T, RoomRecordingUpsertArgs<ExtArgs>>): Prisma__RoomRecordingClient<$Result.GetResult<Prisma.$RoomRecordingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RoomRecordings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomRecordingCountArgs} args - Arguments to filter RoomRecordings to count.
     * @example
     * // Count the number of RoomRecordings
     * const count = await prisma.roomRecording.count({
     *   where: {
     *     // ... the filter for the RoomRecordings we want to count
     *   }
     * })
    **/
    count<T extends RoomRecordingCountArgs>(
      args?: Subset<T, RoomRecordingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomRecordingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomRecording.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomRecordingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomRecordingAggregateArgs>(args: Subset<T, RoomRecordingAggregateArgs>): Prisma.PrismaPromise<GetRoomRecordingAggregateType<T>>

    /**
     * Group by RoomRecording.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomRecordingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomRecordingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomRecordingGroupByArgs['orderBy'] }
        : { orderBy?: RoomRecordingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomRecordingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomRecordingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomRecording model
   */
  readonly fields: RoomRecordingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomRecording.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomRecordingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomRecording model
   */ 
  interface RoomRecordingFieldRefs {
    readonly id: FieldRef<"RoomRecording", 'String'>
    readonly roomId: FieldRef<"RoomRecording", 'String'>
    readonly userId: FieldRef<"RoomRecording", 'String'>
    readonly finalRoomUrl: FieldRef<"RoomRecording", 'String'>
    readonly createdAt: FieldRef<"RoomRecording", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomRecording findUnique
   */
  export type RoomRecordingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
    /**
     * Filter, which RoomRecording to fetch.
     */
    where: RoomRecordingWhereUniqueInput
  }

  /**
   * RoomRecording findUniqueOrThrow
   */
  export type RoomRecordingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
    /**
     * Filter, which RoomRecording to fetch.
     */
    where: RoomRecordingWhereUniqueInput
  }

  /**
   * RoomRecording findFirst
   */
  export type RoomRecordingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
    /**
     * Filter, which RoomRecording to fetch.
     */
    where?: RoomRecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomRecordings to fetch.
     */
    orderBy?: RoomRecordingOrderByWithRelationInput | RoomRecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomRecordings.
     */
    cursor?: RoomRecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomRecordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomRecordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomRecordings.
     */
    distinct?: RoomRecordingScalarFieldEnum | RoomRecordingScalarFieldEnum[]
  }

  /**
   * RoomRecording findFirstOrThrow
   */
  export type RoomRecordingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
    /**
     * Filter, which RoomRecording to fetch.
     */
    where?: RoomRecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomRecordings to fetch.
     */
    orderBy?: RoomRecordingOrderByWithRelationInput | RoomRecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomRecordings.
     */
    cursor?: RoomRecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomRecordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomRecordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomRecordings.
     */
    distinct?: RoomRecordingScalarFieldEnum | RoomRecordingScalarFieldEnum[]
  }

  /**
   * RoomRecording findMany
   */
  export type RoomRecordingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
    /**
     * Filter, which RoomRecordings to fetch.
     */
    where?: RoomRecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomRecordings to fetch.
     */
    orderBy?: RoomRecordingOrderByWithRelationInput | RoomRecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomRecordings.
     */
    cursor?: RoomRecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomRecordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomRecordings.
     */
    skip?: number
    distinct?: RoomRecordingScalarFieldEnum | RoomRecordingScalarFieldEnum[]
  }

  /**
   * RoomRecording create
   */
  export type RoomRecordingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
    /**
     * The data needed to create a RoomRecording.
     */
    data: XOR<RoomRecordingCreateInput, RoomRecordingUncheckedCreateInput>
  }

  /**
   * RoomRecording createMany
   */
  export type RoomRecordingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomRecordings.
     */
    data: RoomRecordingCreateManyInput | RoomRecordingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomRecording createManyAndReturn
   */
  export type RoomRecordingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RoomRecordings.
     */
    data: RoomRecordingCreateManyInput | RoomRecordingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomRecording update
   */
  export type RoomRecordingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
    /**
     * The data needed to update a RoomRecording.
     */
    data: XOR<RoomRecordingUpdateInput, RoomRecordingUncheckedUpdateInput>
    /**
     * Choose, which RoomRecording to update.
     */
    where: RoomRecordingWhereUniqueInput
  }

  /**
   * RoomRecording updateMany
   */
  export type RoomRecordingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomRecordings.
     */
    data: XOR<RoomRecordingUpdateManyMutationInput, RoomRecordingUncheckedUpdateManyInput>
    /**
     * Filter which RoomRecordings to update
     */
    where?: RoomRecordingWhereInput
  }

  /**
   * RoomRecording upsert
   */
  export type RoomRecordingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
    /**
     * The filter to search for the RoomRecording to update in case it exists.
     */
    where: RoomRecordingWhereUniqueInput
    /**
     * In case the RoomRecording found by the `where` argument doesn't exist, create a new RoomRecording with this data.
     */
    create: XOR<RoomRecordingCreateInput, RoomRecordingUncheckedCreateInput>
    /**
     * In case the RoomRecording was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomRecordingUpdateInput, RoomRecordingUncheckedUpdateInput>
  }

  /**
   * RoomRecording delete
   */
  export type RoomRecordingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
    /**
     * Filter which RoomRecording to delete.
     */
    where: RoomRecordingWhereUniqueInput
  }

  /**
   * RoomRecording deleteMany
   */
  export type RoomRecordingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomRecordings to delete
     */
    where?: RoomRecordingWhereInput
  }

  /**
   * RoomRecording without action
   */
  export type RoomRecordingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomRecording
     */
    select?: RoomRecordingSelect<ExtArgs> | null
  }


  /**
   * Model Recording
   */

  export type AggregateRecording = {
    _count: RecordingCountAggregateOutputType | null
    _min: RecordingMinAggregateOutputType | null
    _max: RecordingMaxAggregateOutputType | null
  }

  export type RecordingMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    status: $Enums.RecordingStatus | null
    createdAt: Date | null
    finalUrl: string | null
  }

  export type RecordingMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    userId: string | null
    status: $Enums.RecordingStatus | null
    createdAt: Date | null
    finalUrl: string | null
  }

  export type RecordingCountAggregateOutputType = {
    id: number
    roomId: number
    userId: number
    status: number
    createdAt: number
    finalUrl: number
    _all: number
  }


  export type RecordingMinAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    status?: true
    createdAt?: true
    finalUrl?: true
  }

  export type RecordingMaxAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    status?: true
    createdAt?: true
    finalUrl?: true
  }

  export type RecordingCountAggregateInputType = {
    id?: true
    roomId?: true
    userId?: true
    status?: true
    createdAt?: true
    finalUrl?: true
    _all?: true
  }

  export type RecordingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recording to aggregate.
     */
    where?: RecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recordings to fetch.
     */
    orderBy?: RecordingOrderByWithRelationInput | RecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recordings
    **/
    _count?: true | RecordingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecordingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecordingMaxAggregateInputType
  }

  export type GetRecordingAggregateType<T extends RecordingAggregateArgs> = {
        [P in keyof T & keyof AggregateRecording]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecording[P]>
      : GetScalarType<T[P], AggregateRecording[P]>
  }




  export type RecordingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingWhereInput
    orderBy?: RecordingOrderByWithAggregationInput | RecordingOrderByWithAggregationInput[]
    by: RecordingScalarFieldEnum[] | RecordingScalarFieldEnum
    having?: RecordingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecordingCountAggregateInputType | true
    _min?: RecordingMinAggregateInputType
    _max?: RecordingMaxAggregateInputType
  }

  export type RecordingGroupByOutputType = {
    id: string
    roomId: string
    userId: string
    status: $Enums.RecordingStatus
    createdAt: Date
    finalUrl: string | null
    _count: RecordingCountAggregateOutputType | null
    _min: RecordingMinAggregateOutputType | null
    _max: RecordingMaxAggregateOutputType | null
  }

  type GetRecordingGroupByPayload<T extends RecordingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecordingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecordingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecordingGroupByOutputType[P]>
            : GetScalarType<T[P], RecordingGroupByOutputType[P]>
        }
      >
    >


  export type RecordingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    status?: boolean
    createdAt?: boolean
    finalUrl?: boolean
    chunks?: boolean | Recording$chunksArgs<ExtArgs>
    _count?: boolean | RecordingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recording"]>

  export type RecordingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    userId?: boolean
    status?: boolean
    createdAt?: boolean
    finalUrl?: boolean
  }, ExtArgs["result"]["recording"]>

  export type RecordingSelectScalar = {
    id?: boolean
    roomId?: boolean
    userId?: boolean
    status?: boolean
    createdAt?: boolean
    finalUrl?: boolean
  }

  export type RecordingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | Recording$chunksArgs<ExtArgs>
    _count?: boolean | RecordingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RecordingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RecordingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recording"
    objects: {
      chunks: Prisma.$RecordingChunkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      userId: string
      status: $Enums.RecordingStatus
      createdAt: Date
      finalUrl: string | null
    }, ExtArgs["result"]["recording"]>
    composites: {}
  }

  type RecordingGetPayload<S extends boolean | null | undefined | RecordingDefaultArgs> = $Result.GetResult<Prisma.$RecordingPayload, S>

  type RecordingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RecordingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RecordingCountAggregateInputType | true
    }

  export interface RecordingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recording'], meta: { name: 'Recording' } }
    /**
     * Find zero or one Recording that matches the filter.
     * @param {RecordingFindUniqueArgs} args - Arguments to find a Recording
     * @example
     * // Get one Recording
     * const recording = await prisma.recording.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecordingFindUniqueArgs>(args: SelectSubset<T, RecordingFindUniqueArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Recording that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RecordingFindUniqueOrThrowArgs} args - Arguments to find a Recording
     * @example
     * // Get one Recording
     * const recording = await prisma.recording.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecordingFindUniqueOrThrowArgs>(args: SelectSubset<T, RecordingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Recording that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingFindFirstArgs} args - Arguments to find a Recording
     * @example
     * // Get one Recording
     * const recording = await prisma.recording.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecordingFindFirstArgs>(args?: SelectSubset<T, RecordingFindFirstArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Recording that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingFindFirstOrThrowArgs} args - Arguments to find a Recording
     * @example
     * // Get one Recording
     * const recording = await prisma.recording.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecordingFindFirstOrThrowArgs>(args?: SelectSubset<T, RecordingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Recordings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recordings
     * const recordings = await prisma.recording.findMany()
     * 
     * // Get first 10 Recordings
     * const recordings = await prisma.recording.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recordingWithIdOnly = await prisma.recording.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecordingFindManyArgs>(args?: SelectSubset<T, RecordingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Recording.
     * @param {RecordingCreateArgs} args - Arguments to create a Recording.
     * @example
     * // Create one Recording
     * const Recording = await prisma.recording.create({
     *   data: {
     *     // ... data to create a Recording
     *   }
     * })
     * 
     */
    create<T extends RecordingCreateArgs>(args: SelectSubset<T, RecordingCreateArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Recordings.
     * @param {RecordingCreateManyArgs} args - Arguments to create many Recordings.
     * @example
     * // Create many Recordings
     * const recording = await prisma.recording.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecordingCreateManyArgs>(args?: SelectSubset<T, RecordingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recordings and returns the data saved in the database.
     * @param {RecordingCreateManyAndReturnArgs} args - Arguments to create many Recordings.
     * @example
     * // Create many Recordings
     * const recording = await prisma.recording.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recordings and only return the `id`
     * const recordingWithIdOnly = await prisma.recording.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecordingCreateManyAndReturnArgs>(args?: SelectSubset<T, RecordingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Recording.
     * @param {RecordingDeleteArgs} args - Arguments to delete one Recording.
     * @example
     * // Delete one Recording
     * const Recording = await prisma.recording.delete({
     *   where: {
     *     // ... filter to delete one Recording
     *   }
     * })
     * 
     */
    delete<T extends RecordingDeleteArgs>(args: SelectSubset<T, RecordingDeleteArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Recording.
     * @param {RecordingUpdateArgs} args - Arguments to update one Recording.
     * @example
     * // Update one Recording
     * const recording = await prisma.recording.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecordingUpdateArgs>(args: SelectSubset<T, RecordingUpdateArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Recordings.
     * @param {RecordingDeleteManyArgs} args - Arguments to filter Recordings to delete.
     * @example
     * // Delete a few Recordings
     * const { count } = await prisma.recording.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecordingDeleteManyArgs>(args?: SelectSubset<T, RecordingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recordings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recordings
     * const recording = await prisma.recording.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecordingUpdateManyArgs>(args: SelectSubset<T, RecordingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Recording.
     * @param {RecordingUpsertArgs} args - Arguments to update or create a Recording.
     * @example
     * // Update or create a Recording
     * const recording = await prisma.recording.upsert({
     *   create: {
     *     // ... data to create a Recording
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recording we want to update
     *   }
     * })
     */
    upsert<T extends RecordingUpsertArgs>(args: SelectSubset<T, RecordingUpsertArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Recordings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingCountArgs} args - Arguments to filter Recordings to count.
     * @example
     * // Count the number of Recordings
     * const count = await prisma.recording.count({
     *   where: {
     *     // ... the filter for the Recordings we want to count
     *   }
     * })
    **/
    count<T extends RecordingCountArgs>(
      args?: Subset<T, RecordingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecordingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recording.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecordingAggregateArgs>(args: Subset<T, RecordingAggregateArgs>): Prisma.PrismaPromise<GetRecordingAggregateType<T>>

    /**
     * Group by Recording.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecordingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecordingGroupByArgs['orderBy'] }
        : { orderBy?: RecordingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecordingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecordingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recording model
   */
  readonly fields: RecordingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recording.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecordingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chunks<T extends Recording$chunksArgs<ExtArgs> = {}>(args?: Subset<T, Recording$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recording model
   */ 
  interface RecordingFieldRefs {
    readonly id: FieldRef<"Recording", 'String'>
    readonly roomId: FieldRef<"Recording", 'String'>
    readonly userId: FieldRef<"Recording", 'String'>
    readonly status: FieldRef<"Recording", 'RecordingStatus'>
    readonly createdAt: FieldRef<"Recording", 'DateTime'>
    readonly finalUrl: FieldRef<"Recording", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Recording findUnique
   */
  export type RecordingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recording to fetch.
     */
    where: RecordingWhereUniqueInput
  }

  /**
   * Recording findUniqueOrThrow
   */
  export type RecordingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recording to fetch.
     */
    where: RecordingWhereUniqueInput
  }

  /**
   * Recording findFirst
   */
  export type RecordingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recording to fetch.
     */
    where?: RecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recordings to fetch.
     */
    orderBy?: RecordingOrderByWithRelationInput | RecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recordings.
     */
    cursor?: RecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recordings.
     */
    distinct?: RecordingScalarFieldEnum | RecordingScalarFieldEnum[]
  }

  /**
   * Recording findFirstOrThrow
   */
  export type RecordingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recording to fetch.
     */
    where?: RecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recordings to fetch.
     */
    orderBy?: RecordingOrderByWithRelationInput | RecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recordings.
     */
    cursor?: RecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recordings.
     */
    distinct?: RecordingScalarFieldEnum | RecordingScalarFieldEnum[]
  }

  /**
   * Recording findMany
   */
  export type RecordingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recordings to fetch.
     */
    where?: RecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recordings to fetch.
     */
    orderBy?: RecordingOrderByWithRelationInput | RecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recordings.
     */
    cursor?: RecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recordings.
     */
    skip?: number
    distinct?: RecordingScalarFieldEnum | RecordingScalarFieldEnum[]
  }

  /**
   * Recording create
   */
  export type RecordingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * The data needed to create a Recording.
     */
    data: XOR<RecordingCreateInput, RecordingUncheckedCreateInput>
  }

  /**
   * Recording createMany
   */
  export type RecordingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recordings.
     */
    data: RecordingCreateManyInput | RecordingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recording createManyAndReturn
   */
  export type RecordingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Recordings.
     */
    data: RecordingCreateManyInput | RecordingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recording update
   */
  export type RecordingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * The data needed to update a Recording.
     */
    data: XOR<RecordingUpdateInput, RecordingUncheckedUpdateInput>
    /**
     * Choose, which Recording to update.
     */
    where: RecordingWhereUniqueInput
  }

  /**
   * Recording updateMany
   */
  export type RecordingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recordings.
     */
    data: XOR<RecordingUpdateManyMutationInput, RecordingUncheckedUpdateManyInput>
    /**
     * Filter which Recordings to update
     */
    where?: RecordingWhereInput
  }

  /**
   * Recording upsert
   */
  export type RecordingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * The filter to search for the Recording to update in case it exists.
     */
    where: RecordingWhereUniqueInput
    /**
     * In case the Recording found by the `where` argument doesn't exist, create a new Recording with this data.
     */
    create: XOR<RecordingCreateInput, RecordingUncheckedCreateInput>
    /**
     * In case the Recording was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecordingUpdateInput, RecordingUncheckedUpdateInput>
  }

  /**
   * Recording delete
   */
  export type RecordingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter which Recording to delete.
     */
    where: RecordingWhereUniqueInput
  }

  /**
   * Recording deleteMany
   */
  export type RecordingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recordings to delete
     */
    where?: RecordingWhereInput
  }

  /**
   * Recording.chunks
   */
  export type Recording$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    where?: RecordingChunkWhereInput
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    cursor?: RecordingChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * Recording without action
   */
  export type RecordingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
  }


  /**
   * Model RecordingChunk
   */

  export type AggregateRecordingChunk = {
    _count: RecordingChunkCountAggregateOutputType | null
    _avg: RecordingChunkAvgAggregateOutputType | null
    _sum: RecordingChunkSumAggregateOutputType | null
    _min: RecordingChunkMinAggregateOutputType | null
    _max: RecordingChunkMaxAggregateOutputType | null
  }

  export type RecordingChunkAvgAggregateOutputType = {
    chunkIndex: number | null
  }

  export type RecordingChunkSumAggregateOutputType = {
    chunkIndex: number | null
  }

  export type RecordingChunkMinAggregateOutputType = {
    id: string | null
    recordingId: string | null
    chunkIndex: number | null
    uploaded: boolean | null
    fileUrl: string | null
  }

  export type RecordingChunkMaxAggregateOutputType = {
    id: string | null
    recordingId: string | null
    chunkIndex: number | null
    uploaded: boolean | null
    fileUrl: string | null
  }

  export type RecordingChunkCountAggregateOutputType = {
    id: number
    recordingId: number
    chunkIndex: number
    uploaded: number
    fileUrl: number
    _all: number
  }


  export type RecordingChunkAvgAggregateInputType = {
    chunkIndex?: true
  }

  export type RecordingChunkSumAggregateInputType = {
    chunkIndex?: true
  }

  export type RecordingChunkMinAggregateInputType = {
    id?: true
    recordingId?: true
    chunkIndex?: true
    uploaded?: true
    fileUrl?: true
  }

  export type RecordingChunkMaxAggregateInputType = {
    id?: true
    recordingId?: true
    chunkIndex?: true
    uploaded?: true
    fileUrl?: true
  }

  export type RecordingChunkCountAggregateInputType = {
    id?: true
    recordingId?: true
    chunkIndex?: true
    uploaded?: true
    fileUrl?: true
    _all?: true
  }

  export type RecordingChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordingChunk to aggregate.
     */
    where?: RecordingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingChunks to fetch.
     */
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecordingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RecordingChunks
    **/
    _count?: true | RecordingChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecordingChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecordingChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecordingChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecordingChunkMaxAggregateInputType
  }

  export type GetRecordingChunkAggregateType<T extends RecordingChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateRecordingChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecordingChunk[P]>
      : GetScalarType<T[P], AggregateRecordingChunk[P]>
  }




  export type RecordingChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingChunkWhereInput
    orderBy?: RecordingChunkOrderByWithAggregationInput | RecordingChunkOrderByWithAggregationInput[]
    by: RecordingChunkScalarFieldEnum[] | RecordingChunkScalarFieldEnum
    having?: RecordingChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecordingChunkCountAggregateInputType | true
    _avg?: RecordingChunkAvgAggregateInputType
    _sum?: RecordingChunkSumAggregateInputType
    _min?: RecordingChunkMinAggregateInputType
    _max?: RecordingChunkMaxAggregateInputType
  }

  export type RecordingChunkGroupByOutputType = {
    id: string
    recordingId: string
    chunkIndex: number
    uploaded: boolean
    fileUrl: string | null
    _count: RecordingChunkCountAggregateOutputType | null
    _avg: RecordingChunkAvgAggregateOutputType | null
    _sum: RecordingChunkSumAggregateOutputType | null
    _min: RecordingChunkMinAggregateOutputType | null
    _max: RecordingChunkMaxAggregateOutputType | null
  }

  type GetRecordingChunkGroupByPayload<T extends RecordingChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecordingChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecordingChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecordingChunkGroupByOutputType[P]>
            : GetScalarType<T[P], RecordingChunkGroupByOutputType[P]>
        }
      >
    >


  export type RecordingChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordingId?: boolean
    chunkIndex?: boolean
    uploaded?: boolean
    fileUrl?: boolean
    recording?: boolean | RecordingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recordingChunk"]>

  export type RecordingChunkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    recordingId?: boolean
    chunkIndex?: boolean
    uploaded?: boolean
    fileUrl?: boolean
    recording?: boolean | RecordingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recordingChunk"]>

  export type RecordingChunkSelectScalar = {
    id?: boolean
    recordingId?: boolean
    chunkIndex?: boolean
    uploaded?: boolean
    fileUrl?: boolean
  }

  export type RecordingChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recording?: boolean | RecordingDefaultArgs<ExtArgs>
  }
  export type RecordingChunkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recording?: boolean | RecordingDefaultArgs<ExtArgs>
  }

  export type $RecordingChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RecordingChunk"
    objects: {
      recording: Prisma.$RecordingPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      recordingId: string
      chunkIndex: number
      uploaded: boolean
      fileUrl: string | null
    }, ExtArgs["result"]["recordingChunk"]>
    composites: {}
  }

  type RecordingChunkGetPayload<S extends boolean | null | undefined | RecordingChunkDefaultArgs> = $Result.GetResult<Prisma.$RecordingChunkPayload, S>

  type RecordingChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RecordingChunkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RecordingChunkCountAggregateInputType | true
    }

  export interface RecordingChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RecordingChunk'], meta: { name: 'RecordingChunk' } }
    /**
     * Find zero or one RecordingChunk that matches the filter.
     * @param {RecordingChunkFindUniqueArgs} args - Arguments to find a RecordingChunk
     * @example
     * // Get one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecordingChunkFindUniqueArgs>(args: SelectSubset<T, RecordingChunkFindUniqueArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RecordingChunk that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RecordingChunkFindUniqueOrThrowArgs} args - Arguments to find a RecordingChunk
     * @example
     * // Get one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecordingChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, RecordingChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RecordingChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkFindFirstArgs} args - Arguments to find a RecordingChunk
     * @example
     * // Get one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecordingChunkFindFirstArgs>(args?: SelectSubset<T, RecordingChunkFindFirstArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RecordingChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkFindFirstOrThrowArgs} args - Arguments to find a RecordingChunk
     * @example
     * // Get one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecordingChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, RecordingChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RecordingChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RecordingChunks
     * const recordingChunks = await prisma.recordingChunk.findMany()
     * 
     * // Get first 10 RecordingChunks
     * const recordingChunks = await prisma.recordingChunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recordingChunkWithIdOnly = await prisma.recordingChunk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecordingChunkFindManyArgs>(args?: SelectSubset<T, RecordingChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RecordingChunk.
     * @param {RecordingChunkCreateArgs} args - Arguments to create a RecordingChunk.
     * @example
     * // Create one RecordingChunk
     * const RecordingChunk = await prisma.recordingChunk.create({
     *   data: {
     *     // ... data to create a RecordingChunk
     *   }
     * })
     * 
     */
    create<T extends RecordingChunkCreateArgs>(args: SelectSubset<T, RecordingChunkCreateArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RecordingChunks.
     * @param {RecordingChunkCreateManyArgs} args - Arguments to create many RecordingChunks.
     * @example
     * // Create many RecordingChunks
     * const recordingChunk = await prisma.recordingChunk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecordingChunkCreateManyArgs>(args?: SelectSubset<T, RecordingChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RecordingChunks and returns the data saved in the database.
     * @param {RecordingChunkCreateManyAndReturnArgs} args - Arguments to create many RecordingChunks.
     * @example
     * // Create many RecordingChunks
     * const recordingChunk = await prisma.recordingChunk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RecordingChunks and only return the `id`
     * const recordingChunkWithIdOnly = await prisma.recordingChunk.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecordingChunkCreateManyAndReturnArgs>(args?: SelectSubset<T, RecordingChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RecordingChunk.
     * @param {RecordingChunkDeleteArgs} args - Arguments to delete one RecordingChunk.
     * @example
     * // Delete one RecordingChunk
     * const RecordingChunk = await prisma.recordingChunk.delete({
     *   where: {
     *     // ... filter to delete one RecordingChunk
     *   }
     * })
     * 
     */
    delete<T extends RecordingChunkDeleteArgs>(args: SelectSubset<T, RecordingChunkDeleteArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RecordingChunk.
     * @param {RecordingChunkUpdateArgs} args - Arguments to update one RecordingChunk.
     * @example
     * // Update one RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecordingChunkUpdateArgs>(args: SelectSubset<T, RecordingChunkUpdateArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RecordingChunks.
     * @param {RecordingChunkDeleteManyArgs} args - Arguments to filter RecordingChunks to delete.
     * @example
     * // Delete a few RecordingChunks
     * const { count } = await prisma.recordingChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecordingChunkDeleteManyArgs>(args?: SelectSubset<T, RecordingChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RecordingChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RecordingChunks
     * const recordingChunk = await prisma.recordingChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecordingChunkUpdateManyArgs>(args: SelectSubset<T, RecordingChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RecordingChunk.
     * @param {RecordingChunkUpsertArgs} args - Arguments to update or create a RecordingChunk.
     * @example
     * // Update or create a RecordingChunk
     * const recordingChunk = await prisma.recordingChunk.upsert({
     *   create: {
     *     // ... data to create a RecordingChunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RecordingChunk we want to update
     *   }
     * })
     */
    upsert<T extends RecordingChunkUpsertArgs>(args: SelectSubset<T, RecordingChunkUpsertArgs<ExtArgs>>): Prisma__RecordingChunkClient<$Result.GetResult<Prisma.$RecordingChunkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RecordingChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkCountArgs} args - Arguments to filter RecordingChunks to count.
     * @example
     * // Count the number of RecordingChunks
     * const count = await prisma.recordingChunk.count({
     *   where: {
     *     // ... the filter for the RecordingChunks we want to count
     *   }
     * })
    **/
    count<T extends RecordingChunkCountArgs>(
      args?: Subset<T, RecordingChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecordingChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RecordingChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecordingChunkAggregateArgs>(args: Subset<T, RecordingChunkAggregateArgs>): Prisma.PrismaPromise<GetRecordingChunkAggregateType<T>>

    /**
     * Group by RecordingChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingChunkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecordingChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecordingChunkGroupByArgs['orderBy'] }
        : { orderBy?: RecordingChunkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecordingChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecordingChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RecordingChunk model
   */
  readonly fields: RecordingChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RecordingChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecordingChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recording<T extends RecordingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RecordingDefaultArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RecordingChunk model
   */ 
  interface RecordingChunkFieldRefs {
    readonly id: FieldRef<"RecordingChunk", 'String'>
    readonly recordingId: FieldRef<"RecordingChunk", 'String'>
    readonly chunkIndex: FieldRef<"RecordingChunk", 'Int'>
    readonly uploaded: FieldRef<"RecordingChunk", 'Boolean'>
    readonly fileUrl: FieldRef<"RecordingChunk", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RecordingChunk findUnique
   */
  export type RecordingChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunk to fetch.
     */
    where: RecordingChunkWhereUniqueInput
  }

  /**
   * RecordingChunk findUniqueOrThrow
   */
  export type RecordingChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunk to fetch.
     */
    where: RecordingChunkWhereUniqueInput
  }

  /**
   * RecordingChunk findFirst
   */
  export type RecordingChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunk to fetch.
     */
    where?: RecordingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingChunks to fetch.
     */
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordingChunks.
     */
    cursor?: RecordingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordingChunks.
     */
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * RecordingChunk findFirstOrThrow
   */
  export type RecordingChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunk to fetch.
     */
    where?: RecordingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingChunks to fetch.
     */
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RecordingChunks.
     */
    cursor?: RecordingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RecordingChunks.
     */
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * RecordingChunk findMany
   */
  export type RecordingChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter, which RecordingChunks to fetch.
     */
    where?: RecordingChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RecordingChunks to fetch.
     */
    orderBy?: RecordingChunkOrderByWithRelationInput | RecordingChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RecordingChunks.
     */
    cursor?: RecordingChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RecordingChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RecordingChunks.
     */
    skip?: number
    distinct?: RecordingChunkScalarFieldEnum | RecordingChunkScalarFieldEnum[]
  }

  /**
   * RecordingChunk create
   */
  export type RecordingChunkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a RecordingChunk.
     */
    data: XOR<RecordingChunkCreateInput, RecordingChunkUncheckedCreateInput>
  }

  /**
   * RecordingChunk createMany
   */
  export type RecordingChunkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RecordingChunks.
     */
    data: RecordingChunkCreateManyInput | RecordingChunkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RecordingChunk createManyAndReturn
   */
  export type RecordingChunkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RecordingChunks.
     */
    data: RecordingChunkCreateManyInput | RecordingChunkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RecordingChunk update
   */
  export type RecordingChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a RecordingChunk.
     */
    data: XOR<RecordingChunkUpdateInput, RecordingChunkUncheckedUpdateInput>
    /**
     * Choose, which RecordingChunk to update.
     */
    where: RecordingChunkWhereUniqueInput
  }

  /**
   * RecordingChunk updateMany
   */
  export type RecordingChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RecordingChunks.
     */
    data: XOR<RecordingChunkUpdateManyMutationInput, RecordingChunkUncheckedUpdateManyInput>
    /**
     * Filter which RecordingChunks to update
     */
    where?: RecordingChunkWhereInput
  }

  /**
   * RecordingChunk upsert
   */
  export type RecordingChunkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the RecordingChunk to update in case it exists.
     */
    where: RecordingChunkWhereUniqueInput
    /**
     * In case the RecordingChunk found by the `where` argument doesn't exist, create a new RecordingChunk with this data.
     */
    create: XOR<RecordingChunkCreateInput, RecordingChunkUncheckedCreateInput>
    /**
     * In case the RecordingChunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecordingChunkUpdateInput, RecordingChunkUncheckedUpdateInput>
  }

  /**
   * RecordingChunk delete
   */
  export type RecordingChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
    /**
     * Filter which RecordingChunk to delete.
     */
    where: RecordingChunkWhereUniqueInput
  }

  /**
   * RecordingChunk deleteMany
   */
  export type RecordingChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RecordingChunks to delete
     */
    where?: RecordingChunkWhereInput
  }

  /**
   * RecordingChunk without action
   */
  export type RecordingChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecordingChunk
     */
    select?: RecordingChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingChunkInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RoomRecordingScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    userId: 'userId',
    finalRoomUrl: 'finalRoomUrl',
    createdAt: 'createdAt'
  };

  export type RoomRecordingScalarFieldEnum = (typeof RoomRecordingScalarFieldEnum)[keyof typeof RoomRecordingScalarFieldEnum]


  export const RecordingScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    userId: 'userId',
    status: 'status',
    createdAt: 'createdAt',
    finalUrl: 'finalUrl'
  };

  export type RecordingScalarFieldEnum = (typeof RecordingScalarFieldEnum)[keyof typeof RecordingScalarFieldEnum]


  export const RecordingChunkScalarFieldEnum: {
    id: 'id',
    recordingId: 'recordingId',
    chunkIndex: 'chunkIndex',
    uploaded: 'uploaded',
    fileUrl: 'fileUrl'
  };

  export type RecordingChunkScalarFieldEnum = (typeof RecordingChunkScalarFieldEnum)[keyof typeof RecordingChunkScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'RecordingStatus'
   */
  export type EnumRecordingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecordingStatus'>
    


  /**
   * Reference to a field of type 'RecordingStatus[]'
   */
  export type ListEnumRecordingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecordingStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RoomRecordingWhereInput = {
    AND?: RoomRecordingWhereInput | RoomRecordingWhereInput[]
    OR?: RoomRecordingWhereInput[]
    NOT?: RoomRecordingWhereInput | RoomRecordingWhereInput[]
    id?: StringFilter<"RoomRecording"> | string
    roomId?: StringFilter<"RoomRecording"> | string
    userId?: StringFilter<"RoomRecording"> | string
    finalRoomUrl?: StringFilter<"RoomRecording"> | string
    createdAt?: DateTimeFilter<"RoomRecording"> | Date | string
  }

  export type RoomRecordingOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    finalRoomUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomRecordingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    roomId_userId?: RoomRecordingRoomIdUserIdCompoundUniqueInput
    AND?: RoomRecordingWhereInput | RoomRecordingWhereInput[]
    OR?: RoomRecordingWhereInput[]
    NOT?: RoomRecordingWhereInput | RoomRecordingWhereInput[]
    roomId?: StringFilter<"RoomRecording"> | string
    userId?: StringFilter<"RoomRecording"> | string
    finalRoomUrl?: StringFilter<"RoomRecording"> | string
    createdAt?: DateTimeFilter<"RoomRecording"> | Date | string
  }, "id" | "roomId_userId">

  export type RoomRecordingOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    finalRoomUrl?: SortOrder
    createdAt?: SortOrder
    _count?: RoomRecordingCountOrderByAggregateInput
    _max?: RoomRecordingMaxOrderByAggregateInput
    _min?: RoomRecordingMinOrderByAggregateInput
  }

  export type RoomRecordingScalarWhereWithAggregatesInput = {
    AND?: RoomRecordingScalarWhereWithAggregatesInput | RoomRecordingScalarWhereWithAggregatesInput[]
    OR?: RoomRecordingScalarWhereWithAggregatesInput[]
    NOT?: RoomRecordingScalarWhereWithAggregatesInput | RoomRecordingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomRecording"> | string
    roomId?: StringWithAggregatesFilter<"RoomRecording"> | string
    userId?: StringWithAggregatesFilter<"RoomRecording"> | string
    finalRoomUrl?: StringWithAggregatesFilter<"RoomRecording"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RoomRecording"> | Date | string
  }

  export type RecordingWhereInput = {
    AND?: RecordingWhereInput | RecordingWhereInput[]
    OR?: RecordingWhereInput[]
    NOT?: RecordingWhereInput | RecordingWhereInput[]
    id?: StringFilter<"Recording"> | string
    roomId?: StringFilter<"Recording"> | string
    userId?: StringFilter<"Recording"> | string
    status?: EnumRecordingStatusFilter<"Recording"> | $Enums.RecordingStatus
    createdAt?: DateTimeFilter<"Recording"> | Date | string
    finalUrl?: StringNullableFilter<"Recording"> | string | null
    chunks?: RecordingChunkListRelationFilter
  }

  export type RecordingOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    finalUrl?: SortOrderInput | SortOrder
    chunks?: RecordingChunkOrderByRelationAggregateInput
  }

  export type RecordingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecordingWhereInput | RecordingWhereInput[]
    OR?: RecordingWhereInput[]
    NOT?: RecordingWhereInput | RecordingWhereInput[]
    roomId?: StringFilter<"Recording"> | string
    userId?: StringFilter<"Recording"> | string
    status?: EnumRecordingStatusFilter<"Recording"> | $Enums.RecordingStatus
    createdAt?: DateTimeFilter<"Recording"> | Date | string
    finalUrl?: StringNullableFilter<"Recording"> | string | null
    chunks?: RecordingChunkListRelationFilter
  }, "id">

  export type RecordingOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    finalUrl?: SortOrderInput | SortOrder
    _count?: RecordingCountOrderByAggregateInput
    _max?: RecordingMaxOrderByAggregateInput
    _min?: RecordingMinOrderByAggregateInput
  }

  export type RecordingScalarWhereWithAggregatesInput = {
    AND?: RecordingScalarWhereWithAggregatesInput | RecordingScalarWhereWithAggregatesInput[]
    OR?: RecordingScalarWhereWithAggregatesInput[]
    NOT?: RecordingScalarWhereWithAggregatesInput | RecordingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recording"> | string
    roomId?: StringWithAggregatesFilter<"Recording"> | string
    userId?: StringWithAggregatesFilter<"Recording"> | string
    status?: EnumRecordingStatusWithAggregatesFilter<"Recording"> | $Enums.RecordingStatus
    createdAt?: DateTimeWithAggregatesFilter<"Recording"> | Date | string
    finalUrl?: StringNullableWithAggregatesFilter<"Recording"> | string | null
  }

  export type RecordingChunkWhereInput = {
    AND?: RecordingChunkWhereInput | RecordingChunkWhereInput[]
    OR?: RecordingChunkWhereInput[]
    NOT?: RecordingChunkWhereInput | RecordingChunkWhereInput[]
    id?: StringFilter<"RecordingChunk"> | string
    recordingId?: StringFilter<"RecordingChunk"> | string
    chunkIndex?: IntFilter<"RecordingChunk"> | number
    uploaded?: BoolFilter<"RecordingChunk"> | boolean
    fileUrl?: StringNullableFilter<"RecordingChunk"> | string | null
    recording?: XOR<RecordingRelationFilter, RecordingWhereInput>
  }

  export type RecordingChunkOrderByWithRelationInput = {
    id?: SortOrder
    recordingId?: SortOrder
    chunkIndex?: SortOrder
    uploaded?: SortOrder
    fileUrl?: SortOrderInput | SortOrder
    recording?: RecordingOrderByWithRelationInput
  }

  export type RecordingChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    recordingId_chunkIndex?: RecordingChunkRecordingIdChunkIndexCompoundUniqueInput
    AND?: RecordingChunkWhereInput | RecordingChunkWhereInput[]
    OR?: RecordingChunkWhereInput[]
    NOT?: RecordingChunkWhereInput | RecordingChunkWhereInput[]
    recordingId?: StringFilter<"RecordingChunk"> | string
    chunkIndex?: IntFilter<"RecordingChunk"> | number
    uploaded?: BoolFilter<"RecordingChunk"> | boolean
    fileUrl?: StringNullableFilter<"RecordingChunk"> | string | null
    recording?: XOR<RecordingRelationFilter, RecordingWhereInput>
  }, "id" | "recordingId_chunkIndex">

  export type RecordingChunkOrderByWithAggregationInput = {
    id?: SortOrder
    recordingId?: SortOrder
    chunkIndex?: SortOrder
    uploaded?: SortOrder
    fileUrl?: SortOrderInput | SortOrder
    _count?: RecordingChunkCountOrderByAggregateInput
    _avg?: RecordingChunkAvgOrderByAggregateInput
    _max?: RecordingChunkMaxOrderByAggregateInput
    _min?: RecordingChunkMinOrderByAggregateInput
    _sum?: RecordingChunkSumOrderByAggregateInput
  }

  export type RecordingChunkScalarWhereWithAggregatesInput = {
    AND?: RecordingChunkScalarWhereWithAggregatesInput | RecordingChunkScalarWhereWithAggregatesInput[]
    OR?: RecordingChunkScalarWhereWithAggregatesInput[]
    NOT?: RecordingChunkScalarWhereWithAggregatesInput | RecordingChunkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RecordingChunk"> | string
    recordingId?: StringWithAggregatesFilter<"RecordingChunk"> | string
    chunkIndex?: IntWithAggregatesFilter<"RecordingChunk"> | number
    uploaded?: BoolWithAggregatesFilter<"RecordingChunk"> | boolean
    fileUrl?: StringNullableWithAggregatesFilter<"RecordingChunk"> | string | null
  }

  export type RoomRecordingCreateInput = {
    id?: string
    roomId: string
    userId: string
    finalRoomUrl: string
    createdAt?: Date | string
  }

  export type RoomRecordingUncheckedCreateInput = {
    id?: string
    roomId: string
    userId: string
    finalRoomUrl: string
    createdAt?: Date | string
  }

  export type RoomRecordingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    finalRoomUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomRecordingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    finalRoomUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomRecordingCreateManyInput = {
    id?: string
    roomId: string
    userId: string
    finalRoomUrl: string
    createdAt?: Date | string
  }

  export type RoomRecordingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    finalRoomUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomRecordingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    finalRoomUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingCreateInput = {
    id?: string
    roomId: string
    userId: string
    status?: $Enums.RecordingStatus
    createdAt?: Date | string
    finalUrl?: string | null
    chunks?: RecordingChunkCreateNestedManyWithoutRecordingInput
  }

  export type RecordingUncheckedCreateInput = {
    id?: string
    roomId: string
    userId: string
    status?: $Enums.RecordingStatus
    createdAt?: Date | string
    finalUrl?: string | null
    chunks?: RecordingChunkUncheckedCreateNestedManyWithoutRecordingInput
  }

  export type RecordingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordingStatusFieldUpdateOperationsInput | $Enums.RecordingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    chunks?: RecordingChunkUpdateManyWithoutRecordingNestedInput
  }

  export type RecordingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordingStatusFieldUpdateOperationsInput | $Enums.RecordingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finalUrl?: NullableStringFieldUpdateOperationsInput | string | null
    chunks?: RecordingChunkUncheckedUpdateManyWithoutRecordingNestedInput
  }

  export type RecordingCreateManyInput = {
    id?: string
    roomId: string
    userId: string
    status?: $Enums.RecordingStatus
    createdAt?: Date | string
    finalUrl?: string | null
  }

  export type RecordingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordingStatusFieldUpdateOperationsInput | $Enums.RecordingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finalUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecordingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordingStatusFieldUpdateOperationsInput | $Enums.RecordingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finalUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecordingChunkCreateInput = {
    id?: string
    chunkIndex: number
    uploaded?: boolean
    fileUrl?: string | null
    recording: RecordingCreateNestedOneWithoutChunksInput
  }

  export type RecordingChunkUncheckedCreateInput = {
    id?: string
    recordingId: string
    chunkIndex: number
    uploaded?: boolean
    fileUrl?: string | null
  }

  export type RecordingChunkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
    uploaded?: BoolFieldUpdateOperationsInput | boolean
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    recording?: RecordingUpdateOneRequiredWithoutChunksNestedInput
  }

  export type RecordingChunkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordingId?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
    uploaded?: BoolFieldUpdateOperationsInput | boolean
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecordingChunkCreateManyInput = {
    id?: string
    recordingId: string
    chunkIndex: number
    uploaded?: boolean
    fileUrl?: string | null
  }

  export type RecordingChunkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
    uploaded?: BoolFieldUpdateOperationsInput | boolean
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecordingChunkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    recordingId?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
    uploaded?: BoolFieldUpdateOperationsInput | boolean
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RoomRecordingRoomIdUserIdCompoundUniqueInput = {
    roomId: string
    userId: string
  }

  export type RoomRecordingCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    finalRoomUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomRecordingMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    finalRoomUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomRecordingMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    finalRoomUrl?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumRecordingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordingStatus | EnumRecordingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RecordingStatus[] | ListEnumRecordingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecordingStatus[] | ListEnumRecordingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRecordingStatusFilter<$PrismaModel> | $Enums.RecordingStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type RecordingChunkListRelationFilter = {
    every?: RecordingChunkWhereInput
    some?: RecordingChunkWhereInput
    none?: RecordingChunkWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RecordingChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecordingCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    finalUrl?: SortOrder
  }

  export type RecordingMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    finalUrl?: SortOrder
  }

  export type RecordingMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    finalUrl?: SortOrder
  }

  export type EnumRecordingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordingStatus | EnumRecordingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RecordingStatus[] | ListEnumRecordingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecordingStatus[] | ListEnumRecordingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRecordingStatusWithAggregatesFilter<$PrismaModel> | $Enums.RecordingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecordingStatusFilter<$PrismaModel>
    _max?: NestedEnumRecordingStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RecordingRelationFilter = {
    is?: RecordingWhereInput
    isNot?: RecordingWhereInput
  }

  export type RecordingChunkRecordingIdChunkIndexCompoundUniqueInput = {
    recordingId: string
    chunkIndex: number
  }

  export type RecordingChunkCountOrderByAggregateInput = {
    id?: SortOrder
    recordingId?: SortOrder
    chunkIndex?: SortOrder
    uploaded?: SortOrder
    fileUrl?: SortOrder
  }

  export type RecordingChunkAvgOrderByAggregateInput = {
    chunkIndex?: SortOrder
  }

  export type RecordingChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    recordingId?: SortOrder
    chunkIndex?: SortOrder
    uploaded?: SortOrder
    fileUrl?: SortOrder
  }

  export type RecordingChunkMinOrderByAggregateInput = {
    id?: SortOrder
    recordingId?: SortOrder
    chunkIndex?: SortOrder
    uploaded?: SortOrder
    fileUrl?: SortOrder
  }

  export type RecordingChunkSumOrderByAggregateInput = {
    chunkIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RecordingChunkCreateNestedManyWithoutRecordingInput = {
    create?: XOR<RecordingChunkCreateWithoutRecordingInput, RecordingChunkUncheckedCreateWithoutRecordingInput> | RecordingChunkCreateWithoutRecordingInput[] | RecordingChunkUncheckedCreateWithoutRecordingInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutRecordingInput | RecordingChunkCreateOrConnectWithoutRecordingInput[]
    createMany?: RecordingChunkCreateManyRecordingInputEnvelope
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
  }

  export type RecordingChunkUncheckedCreateNestedManyWithoutRecordingInput = {
    create?: XOR<RecordingChunkCreateWithoutRecordingInput, RecordingChunkUncheckedCreateWithoutRecordingInput> | RecordingChunkCreateWithoutRecordingInput[] | RecordingChunkUncheckedCreateWithoutRecordingInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutRecordingInput | RecordingChunkCreateOrConnectWithoutRecordingInput[]
    createMany?: RecordingChunkCreateManyRecordingInputEnvelope
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
  }

  export type EnumRecordingStatusFieldUpdateOperationsInput = {
    set?: $Enums.RecordingStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type RecordingChunkUpdateManyWithoutRecordingNestedInput = {
    create?: XOR<RecordingChunkCreateWithoutRecordingInput, RecordingChunkUncheckedCreateWithoutRecordingInput> | RecordingChunkCreateWithoutRecordingInput[] | RecordingChunkUncheckedCreateWithoutRecordingInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutRecordingInput | RecordingChunkCreateOrConnectWithoutRecordingInput[]
    upsert?: RecordingChunkUpsertWithWhereUniqueWithoutRecordingInput | RecordingChunkUpsertWithWhereUniqueWithoutRecordingInput[]
    createMany?: RecordingChunkCreateManyRecordingInputEnvelope
    set?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    disconnect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    delete?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    update?: RecordingChunkUpdateWithWhereUniqueWithoutRecordingInput | RecordingChunkUpdateWithWhereUniqueWithoutRecordingInput[]
    updateMany?: RecordingChunkUpdateManyWithWhereWithoutRecordingInput | RecordingChunkUpdateManyWithWhereWithoutRecordingInput[]
    deleteMany?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
  }

  export type RecordingChunkUncheckedUpdateManyWithoutRecordingNestedInput = {
    create?: XOR<RecordingChunkCreateWithoutRecordingInput, RecordingChunkUncheckedCreateWithoutRecordingInput> | RecordingChunkCreateWithoutRecordingInput[] | RecordingChunkUncheckedCreateWithoutRecordingInput[]
    connectOrCreate?: RecordingChunkCreateOrConnectWithoutRecordingInput | RecordingChunkCreateOrConnectWithoutRecordingInput[]
    upsert?: RecordingChunkUpsertWithWhereUniqueWithoutRecordingInput | RecordingChunkUpsertWithWhereUniqueWithoutRecordingInput[]
    createMany?: RecordingChunkCreateManyRecordingInputEnvelope
    set?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    disconnect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    delete?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    connect?: RecordingChunkWhereUniqueInput | RecordingChunkWhereUniqueInput[]
    update?: RecordingChunkUpdateWithWhereUniqueWithoutRecordingInput | RecordingChunkUpdateWithWhereUniqueWithoutRecordingInput[]
    updateMany?: RecordingChunkUpdateManyWithWhereWithoutRecordingInput | RecordingChunkUpdateManyWithWhereWithoutRecordingInput[]
    deleteMany?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
  }

  export type RecordingCreateNestedOneWithoutChunksInput = {
    create?: XOR<RecordingCreateWithoutChunksInput, RecordingUncheckedCreateWithoutChunksInput>
    connectOrCreate?: RecordingCreateOrConnectWithoutChunksInput
    connect?: RecordingWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RecordingUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<RecordingCreateWithoutChunksInput, RecordingUncheckedCreateWithoutChunksInput>
    connectOrCreate?: RecordingCreateOrConnectWithoutChunksInput
    upsert?: RecordingUpsertWithoutChunksInput
    connect?: RecordingWhereUniqueInput
    update?: XOR<XOR<RecordingUpdateToOneWithWhereWithoutChunksInput, RecordingUpdateWithoutChunksInput>, RecordingUncheckedUpdateWithoutChunksInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRecordingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordingStatus | EnumRecordingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RecordingStatus[] | ListEnumRecordingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecordingStatus[] | ListEnumRecordingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRecordingStatusFilter<$PrismaModel> | $Enums.RecordingStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRecordingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RecordingStatus | EnumRecordingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RecordingStatus[] | ListEnumRecordingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RecordingStatus[] | ListEnumRecordingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRecordingStatusWithAggregatesFilter<$PrismaModel> | $Enums.RecordingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRecordingStatusFilter<$PrismaModel>
    _max?: NestedEnumRecordingStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type RecordingChunkCreateWithoutRecordingInput = {
    id?: string
    chunkIndex: number
    uploaded?: boolean
    fileUrl?: string | null
  }

  export type RecordingChunkUncheckedCreateWithoutRecordingInput = {
    id?: string
    chunkIndex: number
    uploaded?: boolean
    fileUrl?: string | null
  }

  export type RecordingChunkCreateOrConnectWithoutRecordingInput = {
    where: RecordingChunkWhereUniqueInput
    create: XOR<RecordingChunkCreateWithoutRecordingInput, RecordingChunkUncheckedCreateWithoutRecordingInput>
  }

  export type RecordingChunkCreateManyRecordingInputEnvelope = {
    data: RecordingChunkCreateManyRecordingInput | RecordingChunkCreateManyRecordingInput[]
    skipDuplicates?: boolean
  }

  export type RecordingChunkUpsertWithWhereUniqueWithoutRecordingInput = {
    where: RecordingChunkWhereUniqueInput
    update: XOR<RecordingChunkUpdateWithoutRecordingInput, RecordingChunkUncheckedUpdateWithoutRecordingInput>
    create: XOR<RecordingChunkCreateWithoutRecordingInput, RecordingChunkUncheckedCreateWithoutRecordingInput>
  }

  export type RecordingChunkUpdateWithWhereUniqueWithoutRecordingInput = {
    where: RecordingChunkWhereUniqueInput
    data: XOR<RecordingChunkUpdateWithoutRecordingInput, RecordingChunkUncheckedUpdateWithoutRecordingInput>
  }

  export type RecordingChunkUpdateManyWithWhereWithoutRecordingInput = {
    where: RecordingChunkScalarWhereInput
    data: XOR<RecordingChunkUpdateManyMutationInput, RecordingChunkUncheckedUpdateManyWithoutRecordingInput>
  }

  export type RecordingChunkScalarWhereInput = {
    AND?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
    OR?: RecordingChunkScalarWhereInput[]
    NOT?: RecordingChunkScalarWhereInput | RecordingChunkScalarWhereInput[]
    id?: StringFilter<"RecordingChunk"> | string
    recordingId?: StringFilter<"RecordingChunk"> | string
    chunkIndex?: IntFilter<"RecordingChunk"> | number
    uploaded?: BoolFilter<"RecordingChunk"> | boolean
    fileUrl?: StringNullableFilter<"RecordingChunk"> | string | null
  }

  export type RecordingCreateWithoutChunksInput = {
    id?: string
    roomId: string
    userId: string
    status?: $Enums.RecordingStatus
    createdAt?: Date | string
    finalUrl?: string | null
  }

  export type RecordingUncheckedCreateWithoutChunksInput = {
    id?: string
    roomId: string
    userId: string
    status?: $Enums.RecordingStatus
    createdAt?: Date | string
    finalUrl?: string | null
  }

  export type RecordingCreateOrConnectWithoutChunksInput = {
    where: RecordingWhereUniqueInput
    create: XOR<RecordingCreateWithoutChunksInput, RecordingUncheckedCreateWithoutChunksInput>
  }

  export type RecordingUpsertWithoutChunksInput = {
    update: XOR<RecordingUpdateWithoutChunksInput, RecordingUncheckedUpdateWithoutChunksInput>
    create: XOR<RecordingCreateWithoutChunksInput, RecordingUncheckedCreateWithoutChunksInput>
    where?: RecordingWhereInput
  }

  export type RecordingUpdateToOneWithWhereWithoutChunksInput = {
    where?: RecordingWhereInput
    data: XOR<RecordingUpdateWithoutChunksInput, RecordingUncheckedUpdateWithoutChunksInput>
  }

  export type RecordingUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordingStatusFieldUpdateOperationsInput | $Enums.RecordingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finalUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecordingUncheckedUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumRecordingStatusFieldUpdateOperationsInput | $Enums.RecordingStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finalUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecordingChunkCreateManyRecordingInput = {
    id?: string
    chunkIndex: number
    uploaded?: boolean
    fileUrl?: string | null
  }

  export type RecordingChunkUpdateWithoutRecordingInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
    uploaded?: BoolFieldUpdateOperationsInput | boolean
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecordingChunkUncheckedUpdateWithoutRecordingInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
    uploaded?: BoolFieldUpdateOperationsInput | boolean
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RecordingChunkUncheckedUpdateManyWithoutRecordingInput = {
    id?: StringFieldUpdateOperationsInput | string
    chunkIndex?: IntFieldUpdateOperationsInput | number
    uploaded?: BoolFieldUpdateOperationsInput | boolean
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use RecordingCountOutputTypeDefaultArgs instead
     */
    export type RecordingCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RecordingCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomRecordingDefaultArgs instead
     */
    export type RoomRecordingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomRecordingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecordingDefaultArgs instead
     */
    export type RecordingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RecordingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RecordingChunkDefaultArgs instead
     */
    export type RecordingChunkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RecordingChunkDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}