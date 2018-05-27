// @flow

import type { Reducers } from '../store'

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V
export type State = $ObjMap<Reducers, $ExtractFunctionReturn>
