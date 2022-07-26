/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
var Fragment = element.Fragment;
var Button = components.Button,
    PanelBody = components.PanelBody,
    BaseControl = components.BaseControl,
    ExternalLink = components.ExternalLink,
    Icon = components.Icon,
    TextControl = components.TextControl,
    ToggleControl = components.ToggleControl,
    IconButton = components.IconButton,
    Toolbar = components.Toolbar,
    SelectControl = components.SelectControl;
var RichText = blockEditor.RichText,
    InspectorControls = blockEditor.InspectorControls,
    BlockControls = blockEditor.BlockControls,
    useBlockProps = blockEditor.useBlockProps,
    MediaUpload = blockEditor.MediaUpload,
    MediaBrowser = blockEditor.MediaBrowser,
    MediaPlaceholder = blockEditor.MediaPlaceholder;

var __ = Drupal.t;

var undrrCardSettings = {
  title: __('UNDRR Card'),
  description: __('A card'),
  icon: 'admin-site-alt3',
  supports: {
    align: false,
    className: false,
    customClassName: false
  },
  attributes: {
    ver: {
      type: 'string'
    },
    id: {
      type: 'string',
      default: ''
    },
    mediaID: {
      type: 'number'
    },
    mediaURL: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src'
    },
    title: {
      type: 'string'
    },
    subheading: {
      type: 'string',
      default: ''
    },
    link: {
      type: 'string',
      default: ''
    },
    allowedTypes: {
      type: 'array',
      default: ['image']
    },
    cardBody: {
      type: 'string',
      source: 'html',
      selector: 'p'
    }
  },

  edit: function edit(_ref) {
    var attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        clientId = _ref.clientId;
    var id = attributes.id,
        title = attributes.title,
        subheading = attributes.subheading,
        link = attributes.link,
        mediaID = attributes.mediaID,
        mediaURL = attributes.mediaURL,
        cardBody = attributes.cardBody;

    var blockProps = useBlockProps();

    if (id === '') {
      setAttributes({ id: clientId });
    }

    var onChange = useCallback(function (name, value) {
      if (name === 'id') {
        value = value.replace(/[\s\./]+/g, '-').replace(/[^\w-]+/g, '').toLowerCase().trim();
      }
      setAttributes(_defineProperty({}, name, value));
    }, [clientId]);

    return React.createElement(
      Fragment,
      null,
      React.createElement(
        InspectorControls,
        null,
        React.createElement(
          PanelBody,
          { title: __('Settings'), initialOpen: true },
          React.createElement(MediaUpload, {
            type: 'image',
            allowedTypes: attributes.allowedTypes,
            onSelect: function onSelect(media) {
              setAttributes({
                mediaURL: media.url,
                mediaID: media.id
              });
            },
            value: mediaID,
            render: function render(_ref2) {
              var open = _ref2.open;
              return React.createElement(
                IconButton,
                {
                  isPrimary: true,
                  className: 'wp-block-cloudblocks-feature-box__image-button',
                  label: __('Add/Edit background image'),
                  icon: 'format-image',
                  onClick: open
                },
                'Open media library'
              );
            }
          }),
          React.createElement(Button, {
            label: 'Remove image',
            text: 'Remove image',
            isSecondary: 'true',
            isDestructive: 'true',
            value: id,
            onClick: function onClick() {
              setAttributes({ mediaID: false });
            }
          }),
          React.createElement(TextControl, {
            identifier: 'title',
            label: 'Card title',
            placeholder: __('Title'),
            value: title,
            onChange: function onChange(val) {
              setAttributes({ title: val });
            }
          }),
          React.createElement(TextControl, {
            identifier: 'subheading',
            label: 'Subheadding',
            placeholder: __('Subheadding'),
            value: subheading,
            onChange: function onChange(val) {
              setAttributes({ subheading: val });
            }
          }),
          React.createElement(TextControl, {
            identifier: 'link',
            label: 'Link',
            placeholder: __('Link'),
            value: link,
            onChange: function onChange(val) {
              setAttributes({ link: val });
            }
          }),
          React.createElement(TextControl, {
            identifier: 'id',
            label: 'Anchor ID',

            value: id,
            onChange: function onChange(val) {
              setAttributes({ id: val });
            }
          })
        )
      ),
      React.createElement(
        'article',
        { className: 'vf-card vf-card--brand', id: id },
        React.createElement(
          'div',
          { 'class': 'undrr-card__top' },
          subheading ? React.createElement(
            'span',
            { className: 'vf-card__subheading' },
            subheading
          ) : false,
          mediaID ? React.createElement('img', { src: mediaURL, alt: mediaID, className: 'vf-card__image', loading: 'lazy' }) : false
        ),
        React.createElement(
          'div',
          { className: 'vf-card__content | vf-stack vf-stack--400' },
          React.createElement(
            'h3',
            { className: 'vf-card__heading' },
            link ? React.createElement(
              'a',
              { className: 'vf-card__link', href: link },
              title
            ) : React.createElement(
              Fragment,
              null,
              title
            )
          ),
          React.createElement(
            'div',
            { className: 'vf-card__text' },
            React.createElement(RichText, _extends({}, blockProps, {
              identifier: 'cardBody',
              tagName: 'p',
              label: 'Card content',
              value: cardBody,
              allowedFormats: ['core/bold', 'core/italic', 'core/link'],
              onChange: function onChange(content) {
                return setAttributes({ cardBody: content });
              },
              placeholder: __('Content...')
            }))
          )
        )
      )
    );
  },
  save: function save(_ref3) {
    var attributes = _ref3.attributes;
    var id = attributes.id,
        title = attributes.title,
        subheading = attributes.subheading,
        link = attributes.link,
        mediaID = attributes.mediaID,
        mediaURL = attributes.mediaURL,
        cardBody = attributes.cardBody;

    var blockProps = useBlockProps.save();
    var attr = {
      className: 'vf-card vf-card--brand'
    };
    if (id !== '') {
      attr.id = 'vf-card-' + id;
    }
    return React.createElement(
      'article',
      attr,
      React.createElement(
        'div',
        { 'class': 'undrr-card__top' },
        subheading ? React.createElement(
          'span',
          { className: 'vf-card__subheading' },
          subheading
        ) : false,
        mediaID ? React.createElement('img', { src: mediaURL, alt: mediaID, className: 'vf-card__image', loading: 'lazy' }) : false
      ),
      React.createElement(
        'div',
        { className: 'vf-card__content | vf-stack vf-stack--400' },
        React.createElement(
          'h3',
          { className: 'vf-card__heading' },
          link ? React.createElement(
            'a',
            { className: 'vf-card__link', href: link },
            title
          ) : React.createElement(
            Fragment,
            null,
            title
          )
        ),
        React.createElement(
          'div',
          { className: 'vf-card__text' },
          React.createElement(RichText.Content, _extends({}, blockProps, {
            tagName: 'p',
            value: cardBody }))
        )
      )
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

registerBlockType(category.slug + '/undrr-card', _extends({ category: category.slug }, undrrCardSettings));