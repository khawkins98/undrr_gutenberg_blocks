/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _wp = wp,
    blocks = _wp.blocks,
    data = _wp.data,
    element = _wp.element,
    components = _wp.components,
    blockEditor = _wp.blockEditor;
var registerBlockType = blocks.registerBlockType;
var dispatch = data.dispatch,
    select = data.select;
var Fragment = element.Fragment;
var PanelBody = components.PanelBody,
    BaseControl = components.BaseControl,
    Icon = components.Icon,
    RangeControl = components.RangeControl,
    TextControl = components.TextControl,
    IconButton = components.IconButton,
    Toolbar = components.Toolbar,
    SelectControl = components.SelectControl;
var InnerBlocks = blockEditor.InnerBlocks,
    RichText = blockEditor.RichText,
    InspectorControls = blockEditor.InspectorControls,
    PanelColorSettings = blockEditor.PanelColorSettings,
    MediaUpload = blockEditor.MediaUpload,
    MediaBrowser = blockEditor.MediaBrowser,
    MediaPlaceholder = blockEditor.MediaPlaceholder,
    BlockControls = blockEditor.BlockControls,
    useBlockProps = blockEditor.useBlockProps;

var __ = Drupal.t;

var undrrHeroSettings = {
  title: __('UNDRR Hero block'),
  description: __('A hero to call attention'),
  icon: 'admin-site-alt3',
  attributes: {
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
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
    heroHeight: {
      type: 'integer'
    },
    heroPadding: {
      type: 'integer'
    },
    text: {
      type: 'string'
    },
    allowedTypes: {
      type: 'array',
      default: ['image']
    }
  },

  edit: function edit(_ref) {
    var className = _ref.className,
        attributes = _ref.attributes,
        setAttributes = _ref.setAttributes,
        mediaID = _ref.mediaID,
        isSelected = _ref.isSelected;
    var title = attributes.title,
        mediaURL = attributes.mediaURL,
        subtitle = attributes.subtitle,
        text = attributes.text,
        heroPadding = attributes.heroPadding;


    var vfHeroStyles = {
      "--vf-hero--bg-image": "url('" + mediaURL + "')",
      "--vf-hero--bg-image-size": "auto 28.5rem"
    };
    var blockProps = useBlockProps({ style: vfHeroStyles });

    return React.createElement(
      Fragment,
      null,
      React.createElement(
        'section',
        _extends({}, blockProps, { className: className + ' vf-hero vf-hero--' + heroPadding + ' | vf-u-fullbleed' }),
        React.createElement(
          'div',
          { className: 'vf-hero__content | vf-box | vf-stack vf-stack--400' },
          React.createElement(RichText, {
            identifier: 'title',
            tagName: 'h2',
            value: title,
            placeholder: __('Title'),
            onChange: function onChange(nextTitle) {
              setAttributes({
                title: nextTitle
              });
            },
            onSplit: function onSplit() {
              return null;
            },
            unstableOnSplit: function unstableOnSplit() {
              return null;
            }
          }),
          React.createElement(RichText, {
            identifier: 'subtitle',
            tagName: 'div',
            value: subtitle,
            placeholder: __('Subtitle goes here'),
            onChange: function onChange(nextSubtitle) {
              setAttributes({
                subtitle: nextSubtitle
              });
            },
            onSplit: function onSplit() {
              return null;
            },
            unstableOnSplit: function unstableOnSplit() {
              return null;
            }
          }),
          React.createElement(RichText, {
            identifier: 'text',
            tagName: 'p',
            value: text,
            placeholder: __('Text'),
            onChange: function onChange(nextText) {
              setAttributes({
                text: nextText
              });
            }
          })
        )
      ),
      React.createElement(
        InspectorControls,
        null,
        React.createElement(
          PanelBody,
          { title: __('Block Settings') },
          React.createElement(
            'h2',
            null,
            'Background image'
          ),
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
          React.createElement(SelectControl, {
            label: 'Hero padding',
            value: heroPadding,
            options: [{ label: 'default', value: '0' }, { label: '400', value: '400' }, { label: '800', value: '800' }, { label: '1200', value: '1200' }],
            onChange: function onChange(val) {
              setAttributes({ heroPadding: parseInt(val) });
            },
            __nextHasNoMarginBottom: true
          }),
          React.createElement(TextControl, {
            label: 'Height',
            value: attributes.heroHeight,
            onChange: function onChange(val) {
              setAttributes({ heroHeight: parseInt(val) });
            }
          })
        )
      )
    );
  },
  save: function save(_ref3) {
    var className = _ref3.className,
        attributes = _ref3.attributes;
    var title = attributes.title,
        subtitle = attributes.subtitle,
        mediaID = attributes.mediaID,
        mediaURL = attributes.mediaURL,
        heroHeight = attributes.heroHeight,
        heroPadding = attributes.heroPadding,
        text = attributes.text;


    var vfHeroStyles = {
      "--vf-hero--bg-image": "url('" + mediaURL + "')",
      "--vf-hero--bg-image-size": "auto 28.5rem"
    };

    return React.createElement(
      'section',
      { style: vfHeroStyles, className: className + ' vf-hero vf-hero--' + heroPadding + ' | vf-u-fullbleed' },
      React.createElement(
        'div',
        { className: 'vf-hero__content | vf-box | vf-stack vf-stack--400' },
        title && React.createElement(
          'h2',
          { 'class': 'vf-hero__heading' },
          title
        ),
        subtitle && React.createElement(
          'p',
          { 'class': 'vf-hero__subheading' },
          subtitle
        ),
        text && React.createElement(
          'p',
          { 'class': 'vf-hero__text' },
          text
        ),
        React.createElement(
          'a',
          { 'class': 'vf-hero__link', href: 'JavaScript:Void(0);' },
          'Learn more',
          React.createElement(
            'svg',
            { width: '24', height: '24', xmlns: 'http://www.w3.org/2000/svg' },
            React.createElement('path', { d: 'M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0C5.376.008.008 5.376 0 12zm13.707-5.209l4.5 4.5a1 1 0 010 1.414l-4.5 4.5a1 1 0 01-1.414-1.414l2.366-2.367a.25.25 0 00-.177-.424H6a1 1 0 010-2h8.482a.25.25 0 00.177-.427l-2.366-2.368a1 1 0 011.414-1.414z', fill: '', 'fill-rule': 'nonzero' })
          )
        )
      ),
      React.createElement('img', {
        className: 'hide',
        src: mediaURL,
        alt: '',
        'aria-hidden': 'true'
      })
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

registerBlockType(category.slug + '/undrr-hero-block', _extends({ category: category.slug }, undrrHeroSettings));