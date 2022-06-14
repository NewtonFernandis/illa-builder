import { BaseInspectState } from "@/redux/currentApp/editor/inspect/inspectState"

export interface updateInspectPayload {
  displayName: string
  value: Record<string, any>
}

export interface addOrUpdateInspectPayload {
  displayName: string
  defaultProps: BaseInspectState
}
