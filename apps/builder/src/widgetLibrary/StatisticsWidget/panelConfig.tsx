import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
} from "@illa-design/react"
import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"
import { STATISTICS_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/StatisticsWidget/eventHandlerConfig"

const baseWidgetName = "statistic"
export const STATISTICS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-label-label`,
        labelName: i18n.t("editor.inspect.setter_label.label"),
        attrName: "label",
        setterType: "INPUT_SETTER",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: `${baseWidgetName}-label-primaryValue`,
        labelName: "Primary Value",
        attrName: "primaryValue",
        expectedType: VALIDATION_TYPES.NUMBER,
        isSetterSingleRow: true,
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-secondaryValue`,
        labelName: "Secondary Value",
        attrName: "secondaryValue",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.NUMBER,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-primaryValue`,
    groupName: "primaryValue",
    children: [
      {
        id: `${baseWidgetName}-label-decimalPlace`,
        labelName: "Decimal place",
        attrName: "decimalPlace",
        setterType: "INPUT_SETTER",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.NUMBER,
        placeholder: "{{0}}",
      },
      {
        id: `${baseWidgetName}-label-showTrendSign`,
        labelName: "Show trend sign",
        attrName: "showTrendSign",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-positiveSign`,
        labelName: "Positive sign",
        attrName: "positiveSign",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "ICON_SETTER",
        bindAttrName: ["showTrendSign"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-label-negativeSign`,
        labelName: "Negative sign",
        attrName: "negativeSign",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "ICON_SETTER",
        bindAttrName: ["showTrendSign"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-label-showSeparator`,
        labelName: "Show thousand separator",
        attrName: "showSeparator",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-enableTrendColor`,
        labelName: "Enable Trend Color",
        attrName: "enableTrendColor",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-prefixText`,
        labelName: "prefix Text",
        attrName: "prefixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: "US$",
      },
      {
        id: `${baseWidgetName}-label-suffixText`,
        labelName: "suffix Text",
        attrName: "suffixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: "%",
      },
    ],
  },
  {
    id: `${baseWidgetName}-secondaryValue`,
    groupName: "secondaryValue",
    children: [
      {
        id: `${baseWidgetName}-label-secondaryDecimalPlace`,
        labelName: "Decimal place",
        attrName: "secondaryDecimalPlace",
        setterType: "INPUT_SETTER",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-label-secondaryShowTrendSign`,
        labelName: "Show trend sign",
        attrName: "secondaryShowTrendSign",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-secondaryPositiveSign`,
        labelName: "Positive sign",
        attrName: "secondaryPositiveSign",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "ICON_SETTER",
        bindAttrName: ["secondaryShowTrendSign"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-label-secondaryNegativeSign`,
        labelName: "Negative sign",
        attrName: "secondaryNegativeSign",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "ICON_SETTER",
        bindAttrName: ["secondaryShowTrendSign"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-label-secondaryShowSeparator`,
        labelName: "Show thousand separator",
        attrName: "secondaryShowSeparator",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-secondaryEnableTrendColor`,
        labelName: "Enable Trend Color",
        attrName: "secondaryEnableTrendColor",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-label-secondaryPrefixText`,
        labelName: "prefix Text",
        attrName: "secondaryPrefixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: "US$",
      },
      {
        id: `${baseWidgetName}-label-secondarySuffixText`,
        labelName: "suffix Text",
        attrName: "secondarySuffixText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        placeholder: "%",
      },
    ],
  },
  {
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        ...generatorEventHandlerConfig(
          baseWidgetName,
          STATISTICS_EVENT_HANDLER_CONFIG.events,
        ),
      },
    ],
  },
  {
    id: `${baseWidgetName}-Adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: `${baseWidgetName}-adornments-tooltip`,
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
      {
        id: `${baseWidgetName}-basic-text-align`,
        labelName: i18n.t("editor.inspect.setter_label.text_align"),
        attrName: "textAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "start",
          },
          {
            label: <HorizontalCenterIcon />,
            value: "center",
          },
          {
            label: <HorizontalEndIcon />,
            value: "end",
          },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-style-list`,
        setterType: "LIST_SETTER",
        isSetterSingleRow: true,
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-colorScheme`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "colorScheme",
            defaultValue: "blue",
          },
          {
            id: `${baseWidgetName}-style-positiveColorScheme`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "positiveColorScheme",
            defaultValue: "blue",
          },
          {
            id: `${baseWidgetName}-style-negativeColorScheme`,
            labelName: i18n.t("editor.inspect.setter_label.theme_color"),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "negativeColorScheme",
            defaultValue: "blue",
          },
        ],
      },

      // {
      //   id: `${baseWidgetName}-style-positiveColor`,
      //   setterType: "LIST_SETTER",
      //   isSetterSingleRow: true,
      //   labelName: i18n.t("editor.inspect.setter_label.colors"),
      //   attrName: "positiveColor",
      //   useCustomLayout: true,
      //   childrenSetter: [
      //     {
      //       id: `${baseWidgetName}-style-colorScheme`,
      //       labelName: i18n.t("editor.inspect.setter_label.theme_color"),
      //       setterType: "COLOR_PICKER_SETTER",
      //       attrName: "colorScheme",
      //       defaultValue: "blue",
      //     },
      //   ],
      // },
      //
      // {
      //   id: `${baseWidgetName}-style-negativeColor`,
      //   setterType: "LIST_SETTER",
      //   isSetterSingleRow: true,
      //   labelName: i18n.t("editor.inspect.setter_label.colors"),
      //   attrName: "negativeColor",
      //   useCustomLayout: true,
      //   childrenSetter: [
      //     {
      //       id: `${baseWidgetName}-style-colorScheme`,
      //       labelName: i18n.t("editor.inspect.setter_label.theme_color"),
      //       setterType: "COLOR_PICKER_SETTER",
      //       attrName: "colorScheme",
      //       defaultValue: "blue",
      //     },
      //   ],
      // },
    ],
  },
]
