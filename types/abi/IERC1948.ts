/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type DataUpdated = ContractEventLog<{
  tokenId: string;
  oldData: string;
  newData: string;
  0: string;
  1: string;
  2: string;
}>;

export interface IERC1948 extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): IERC1948;
  clone(): IERC1948;
  methods: {
    readData(
      tokenId: number | string | BN
    ): NonPayableTransactionObject<string>;

    writeData(
      tokenId: number | string | BN,
      newData: string
    ): NonPayableTransactionObject<void>;
  };
  events: {
    DataUpdated(cb?: Callback<DataUpdated>): EventEmitter;
    DataUpdated(
      options?: EventOptions,
      cb?: Callback<DataUpdated>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "DataUpdated", cb: Callback<DataUpdated>): void;
  once(
    event: "DataUpdated",
    options: EventOptions,
    cb: Callback<DataUpdated>
  ): void;
}
