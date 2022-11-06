import { FC, useRef, useLayoutEffect, useMemo } from "react"
import {
  PageNode,
  SectionNode,
  SECTION_POSITION,
} from "@/redux/currentApp/editor/components/componentsState"
import { RenderPageProps } from "./interface"
import {
  LEFT_MIN_WIDTH,
  RenderFooterSection,
  RenderHeaderSection,
  RenderLeftSection,
  RenderRightSection,
  RenderSection,
  RIGHT_MIN_WIDTH,
} from "./renderSection"
import useMeasure from "react-use-measure"
import { useDispatch, useSelector } from "react-redux"
import { getCanvasShape, getIllaMode } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"

const getDisplayNameMapSectionNode = (pageNode: PageNode) => {
  const { childrenNode = [] } = pageNode
  const nameMapSection: Map<string, SectionNode> = new Map()
  childrenNode.forEach((node) => {
    if (node.type === "SECTION_NODE") {
      nameMapSection.set(node.displayName, node as SectionNode)
    }
  })
  return nameMapSection
}

const getLeftAndRightWidth = (
  canvasSize: "responsive" | "fixed",
  width: number,
  containerWidth: number,
) => {
  if (canvasSize === "fixed") {
    return width
  } else {
    return (width / 100) * containerWidth
  }
}

export const RenderPage: FC<RenderPageProps> = (props) => {
  const { pageNode, currentPageDisplayName } = props
  const headerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [containerRef, bounds] = useMeasure()
  const canvasShape = useSelector(getCanvasShape)
  const mode = useSelector(getIllaMode)
  const dispatch = useDispatch()

  const displayNameMapSectionNode = getDisplayNameMapSectionNode(pageNode)

  const { props: pageProps } = pageNode
  const {
    canvasSize,
    hasLeft,
    hasRight,
    hasFooter,
    hasHeader,
    leftPosition,
    rightPosition,
    leftWidth,
    rightWidth,
    topHeight,
    bottomHeight,
    isFooterFixed,
    isHeaderFixed,
    isLeftFixed,
    isRightFixed,
  } = pageProps

  useLayoutEffect(() => {
    if (
      canvasShape.canvasHeight !== bounds.height ||
      canvasShape.canvasWidth !== bounds.width
    ) {
      dispatch(
        configActions.updateCanvasShapeReducer({
          canvasHeight: bounds.height,
          canvasWidth: bounds.width,
        }),
      )
    }
  }, [
    bounds.height,
    bounds.width,
    canvasShape.canvasHeight,
    canvasShape.canvasWidth,
    dispatch,
  ])
  const realLeftWidth = useMemo(() => {
    const leftWidthPX = getLeftAndRightWidth(
      canvasSize,
      leftWidth,
      bounds.width,
    )
    return hasLeft
      ? leftWidthPX <= LEFT_MIN_WIDTH
        ? LEFT_MIN_WIDTH
        : leftWidthPX
      : 0
  }, [bounds.width, canvasSize, hasLeft, leftWidth])

  const realRightWidth = useMemo(() => {
    const rightWidthPX = getLeftAndRightWidth(
      canvasSize,
      rightWidth,
      bounds.width,
    )
    return hasRight
      ? rightWidthPX <= RIGHT_MIN_WIDTH
        ? RIGHT_MIN_WIDTH
        : rightWidthPX
      : 0
  }, [bounds.width, canvasSize, hasRight, rightWidth])

  useLayoutEffect(() => {
    let headerLeft = 0
    let headerWidth = bounds.width
    let leftTop = 0
    let leftHeight = bounds.height
    let rightTop = 0
    let rightHeight = bounds.height
    let footerLeft = 0
    let footerWidth = bounds.width
    let bodyWidth = bounds.width
    let bodyTop = 0
    let bodyLeft = 0
    let bodyHeight = bounds.height

    if (hasLeft) {
      bodyWidth -= realLeftWidth
      bodyLeft = realLeftWidth
      switch (leftPosition) {
        case SECTION_POSITION.TOP: {
          headerLeft = realLeftWidth
          headerWidth -= realLeftWidth
          leftHeight -= bottomHeight
          break
        }
        case SECTION_POSITION.FULL: {
          headerLeft = realLeftWidth
          headerWidth -= realLeftWidth
          footerLeft = realLeftWidth
          footerWidth -= realLeftWidth
          break
        }
        case SECTION_POSITION.BOTTOM: {
          footerLeft = realLeftWidth
          footerWidth -= realLeftWidth
          leftTop = topHeight
          leftHeight -= topHeight
          break
        }
        case SECTION_POSITION.CENTER: {
          leftTop = topHeight
          leftHeight = leftHeight - topHeight - bottomHeight
        }
      }
    }

    if (hasRight) {
      bodyWidth -= realRightWidth
      switch (rightPosition) {
        case SECTION_POSITION.TOP: {
          headerWidth -= realRightWidth
          rightHeight -= bottomHeight
          break
        }
        case SECTION_POSITION.FULL: {
          headerWidth -= realRightWidth
          footerWidth -= realRightWidth
          break
        }
        case SECTION_POSITION.BOTTOM: {
          footerWidth -= realRightWidth
          rightTop = topHeight
          rightHeight -= topHeight
          break
        }
        case SECTION_POSITION.CENTER: {
          rightTop = topHeight
          rightHeight = rightHeight - bottomHeight - topHeight
        }
      }
    }
    if (hasHeader) {
      bodyTop = topHeight
      bodyHeight -= topHeight
    }

    if (hasFooter) {
      bodyHeight -= bottomHeight
    }

    if (hasLeft && leftRef.current) {
      leftRef.current.style.width = `${realLeftWidth}px`
      leftRef.current.style.height = `${leftHeight}px`
      leftRef.current.style.top = `${leftTop}px`
    }
    if (hasRight && rightRef.current) {
      rightRef.current.style.width = `${realRightWidth}px`
      rightRef.current.style.height = `${rightHeight}px`
      rightRef.current.style.top = `${rightTop}px`
    }
    if (hasHeader && headerRef.current) {
      headerRef.current.style.width = `${headerWidth}px`
      headerRef.current.style.left = `${headerLeft}px`
    }
    if (hasFooter && footerRef.current) {
      footerRef.current.style.width = `${footerWidth}px`
      footerRef.current.style.left = `${footerLeft}px`
    }

    if (bodyRef.current) {
      bodyRef.current.style.position = "absolute"
      bodyRef.current.style.width = `${bodyWidth}px`
      bodyRef.current.style.left = `${bodyLeft}px`
      bodyRef.current.style.top = `${bodyTop}px`
      bodyRef.current.style.height = `${bodyHeight}px`
    }
  }, [
    bottomHeight,
    bounds,
    canvasSize,
    hasFooter,
    hasHeader,
    hasLeft,
    hasRight,
    leftPosition,
    leftWidth,
    realLeftWidth,
    realRightWidth,
    rightPosition,
    rightWidth,
    topHeight,
  ])

  const headerSection = displayNameMapSectionNode.get("headerSection")
  const bodySection = displayNameMapSectionNode.get("bodySection")
  const leftSection = displayNameMapSectionNode.get("leftSection")
  const rightSection = displayNameMapSectionNode.get("rightSection")
  const footerSection = displayNameMapSectionNode.get("footerSection")

  if (
    !pageNode ||
    pageNode.type !== "PAGE_NODE" ||
    !pageNode.props ||
    displayNameMapSectionNode.size === 0
  )
    return null

  return (
    <div style={{ width: "100%", height: "100%" }} ref={containerRef}>
      {hasHeader && headerSection && (
        <RenderHeaderSection
          sectionNode={headerSection}
          ref={headerRef}
          topHeight={topHeight}
          offsetTop={bounds.top}
          mode={mode}
          footerHeight={hasFooter ? bottomHeight : 0}
          containerHeight={bounds.height}
          currentPageDisplayName={currentPageDisplayName}
        />
      )}
      {hasLeft && leftSection && (
        <RenderLeftSection
          sectionNode={leftSection}
          ref={leftRef}
          offsetLeft={bounds.left}
          containerWidth={bounds.width}
          mode={mode}
          rightWidth={realRightWidth}
          currentPageDisplayName={currentPageDisplayName}
        />
      )}
      {bodySection && (
        <RenderSection sectionNode={bodySection} ref={bodyRef} mode={mode} />
      )}
      {hasRight && rightSection && (
        <RenderRightSection
          sectionNode={rightSection}
          ref={rightRef}
          offsetLeft={bounds.left}
          containerWidth={bounds.width}
          mode={mode}
          leftWidth={realLeftWidth}
          currentPageDisplayName={currentPageDisplayName}
        />
      )}
      {hasFooter && footerSection && (
        <RenderFooterSection
          sectionNode={footerSection}
          ref={footerRef}
          bottomHeight={bottomHeight}
          offsetTop={bounds.top}
          containerHeight={bounds.height}
          mode={mode}
          headerHeight={hasHeader ? topHeight : 0}
          currentPageDisplayName={currentPageDisplayName}
        />
      )}
    </div>
  )
}
