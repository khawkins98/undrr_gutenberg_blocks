/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _React = React,
    useCallback = _React.useCallback,
    useEffect = _React.useEffect;
var _wp = wp,
    blocks = _wp.blocks,
    data = _wp.data,
    element = _wp.element,
    components = _wp.components,
    blockEditor = _wp.blockEditor;
var registerBlockType = blocks.registerBlockType,
    createBlock = blocks.createBlock;
var dispatch = data.dispatch,
    select = data.select,
    useDispatch = data.useDispatch,
    useSelect = data.useSelect;
var useState = element.useState,
    Fragment = element.Fragment;
var Button = components.Button,
    PanelBody = components.PanelBody,
    BaseControl = components.BaseControl,
    Icon = components.Icon,
    RangeControl = components.RangeControl,
    TextControl = components.TextControl,
    ToggleControl = components.ToggleControl;
var InnerBlocks = blockEditor.InnerBlocks,
    RichText = blockEditor.RichText,
    InspectorControls = blockEditor.InspectorControls,
    PanelColorSettings = blockEditor.PanelColorSettings,
    BlockControls = blockEditor.BlockControls,
    useBlockProps = blockEditor.useBlockProps;

var __ = Drupal.t;

var undrrTabsSettings = {
  title: __('UNDRR Tabs secttion'),
  description: __('A tabs section'),
  icon: 'admin-site-alt3',
  parent: ['undrr/undrr-tabs'],
  supports: {
    align: false,
    className: false,
    customClassName: false,
    html: false,
    inserter: false
  },
  attributes: {
    ver: {
      type: 'string'
    },
    id: {
      type: 'string',
      default: ''
    },
    label: {
      type: 'string',
      default: ''
    },
    unlabelled: {
      type: 'integer',
      default: 0
    }
  },

  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        clientId = _ref.clientId;

    var _useDispatch = useDispatch('core/block-editor'),
        removeBlock = _useDispatch.removeBlock,
        updateBlockAttributes = _useDispatch.updateBlockAttributes;

    var id = attributes.id,
        label = attributes.label,
        unlabelled = attributes.unlabelled;

    if (id === '') {
      setAttributes({ id: clientId });
    }

    var _useSelect = useSelect(function (select) {
      var _select = select('core/block-editor'),
          getBlockOrder = _select.getBlockOrder,
          getBlockRootClientId = _select.getBlockRootClientId;

      var rootClientId = getBlockRootClientId(clientId);
      var parentBlockOrder = getBlockOrder(rootClientId);
      return {
        tabOrder: parentBlockOrder.indexOf(clientId) + 1,
        updateTabs: function updateTabs() {
          updateBlockAttributes(rootClientId, {
            dirty: Date.now()
          });
        }
      };
    }, [clientId]),
        tabOrder = _useSelect.tabOrder,
        updateTabs = _useSelect.updateTabs;

    useEffect(function () {
      if (label === '') {
        setAttributes({ label: __('Tab ' + tabOrder) });
      }
    }, [label]);

    useEffect(function () {
      updateTabs();
    }, [id, label, tabOrder]);

    var onChange = useCallback(function (name, value) {
      if (name === 'id') {
        value = value.replace(/[\s\./]+/g, '-').replace(/[^\w-]+/g, '').toLowerCase().trim();
      }
      setAttributes(_defineProperty({}, name, value));
    }, [clientId]);

    var _useState = useState(true),
        _useState2 = _slicedToArray(_useState, 2),
        headingIsHidden = _useState2[0],
        setHeadingIsHidden = _useState2[1];

    return React.createElement(
      Fragment,
      null,
      React.createElement(
        InspectorControls,
        null,
        React.createElement(
          PanelBody,
          { title: __('Settings'), initialOpen: true },
          React.createElement(TextControl, {
            identifier: 'label',
            label: 'Tab label',
            help: 'to come.',
            value: label,
            onChange: function onChange(val) {
              setAttributes({ label: val });
            }
          }),
          React.createElement(ToggleControl, {
            identifier: 'unlabelled',
            label: 'Hide heading',

            help: unlabelled ? 'Heading hidden.' : 'Heading shown.',
            checked: unlabelled,
            onChange: function onChange(value) {
              setHeadingIsHidden(function (value) {
                return !value;
              });
              unlabelled = headingIsHidden;
              setAttributes({ unlabelled: value });
            }
          }),
          React.createElement(TextControl, {
            identifier: 'id',
            label: 'Anchor ID',

            value: id,
            onChange: function onChange(val) {
              setAttributes({ id: val });
            }
          }),
          React.createElement(Button, {
            label: 'Delete tab',
            text: 'Delete tab',
            isSecondary: 'true',
            isDestructive: 'true',
            value: id,
            onClick: function onClick() {
              removeBlock(clientId, false);
            }
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'vf-tabs__section' },
        attributes.unlabelled ? false : React.createElement(
          'h2',
          null,
          label
        ),
        React.createElement(InnerBlocks, null)
      )
    );
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    var id = attributes.id,
        label = attributes.label,
        unlabelled = attributes.unlabelled;


    var attr = {
      className: 'vf-tabs__section'
    };
    if (id !== '') {
      attr.id = 'vf-tabs__section-' + id;
    }
    var heading = {};
    if (unlabelled === true) {
      heading.className = 'vf-u-sr-only';
    }
    return React.createElement(
      'section',
      attr,
      React.createElement(
        'h2',
        heading,
        label
      ),
      React.createElement(InnerBlocks.Content, null)
    );
  }
};

var category = {
  slug: 'undrr',
  title: __('UNDRR')
};

var currentCategories = select('core/blocks').getCategories().filter(function (item) {
  return item.slug !== category.slug;
});
dispatch('core/blocks').setCategories([category].concat(_toConsumableArray(currentCategories)));

registerBlockType(category.slug + '/undrr-tabs-section', _extends({ category: category.slug }, undrrTabsSettings));