import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyCircleStyle(color: string): SerializedStyles {
  return css`
    background-color: ${color};
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
    flex: none;
  `
}

export const inListSetterWrapperStyle = css`
  width: 154px;
  height: 40px;
`

export const ButtonContentWrapperStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
  align-items: center;
  border-radius: 8px;
  padding: 8px;
  :hover {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
  :active {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`

export const colorContentStyle = css`
  width: 60px;
  margin-left: 8px;
  margin-right: 12px;
  text-align: left;
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  align-self: center;
  line-height: 24px;
  flex: none;
`

export const alphaContentStyle = css`
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  align-self: center;
  line-height: 24px;
  flex: none;
`
