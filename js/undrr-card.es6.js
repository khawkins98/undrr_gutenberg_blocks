const { useCallback, useEffect } = React;
const { blocks, data, element, components, blockEditor } = wp;
const { registerBlockType, createBlock } = blocks;
const { dispatch, select, useDispatch, useSelect } = data;
const { Fragment } = element;
const { Button, PanelBody, BaseControl, ExternalLink, Icon, TextControl, ToggleControl, IconButton, Toolbar, SelectControl } = components;
const { RichText, InspectorControls, BlockControls, useBlockProps, MediaUpload, MediaBrowser, MediaPlaceholder } = blockEditor;
const __ = Drupal.t;

const undrrCardSettings = {
  title: __('UNDRR Card'),
  description: __('A card'),
  icon: 'admin-site-alt3',
  supports: {
    align: false,
    className: false,
    customClassName: false,
    // html: false
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
      type: 'number',
    },
    mediaURL: {
      type: 'string',
      source: 'attribute',
      selector: 'img',
      attribute: 'src',
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
      default: ['image'],
    },
    cardBody: {
      type: 'string',
      source: 'html',
      selector: 'p',
    }
  },

  edit({ attributes, setAttributes, clientId }) {
    let  {id, title, subheading, link, mediaID, mediaURL, cardBody } = attributes;
    const blockProps = useBlockProps();
    // Default to the `clientId` for the ID attribute
    if (id === '') {
      setAttributes({id: clientId});
    }

    // Callback for inspector changes to update attributes
    // Flags the parent tabs block as "dirty"
    const onChange = useCallback(
      (name, value) => {
        if (name === 'id') {
          value = value
            .replace(/[\s\./]+/g, '-')
            .replace(/[^\w-]+/g, '')
            .toLowerCase()
            .trim();
        }
        setAttributes({[name]: value});
      },
      [clientId]
    );

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Settings')} initialOpen>
          <MediaUpload
              type="image"
              allowedTypes={attributes.allowedTypes}
              onSelect={(media) => {
                setAttributes({
                  mediaURL: media.url,
                  mediaID: media.id,
                });
              }}
              value={mediaID}
              render={({ open }) => (
                <IconButton
                  isPrimary
                  className="wp-block-cloudblocks-feature-box__image-button"
                  label={__('Add/Edit background image')}
                  icon="format-image"
                  onClick={open}
                >
                  Open media library
                </IconButton> 
              )}
            />
          <Button
                label='Remove image'
                text='Remove image'
                isSecondary='true'
                isDestructive='true'
                value={ id }
                onClick={ () => {
                  setAttributes( { mediaID: false } );
                }}
            />

          <TextControl
                identifier='title'
                label='Card title'
                placeholder={__('Title')}
                value={ title }
                onChange={ ( val ) => {
                    setAttributes( { title:  val } );
                }}
            />
          <TextControl
                identifier='subheading'
                label='Subheadding'
                placeholder={__('Subheadding')}
                value={ subheading }
                onChange={ ( val ) => {
                    setAttributes( { subheading:  val } );
                }}
            />
          <TextControl
                identifier='link'
                label='Link'
                placeholder={__('Link')}
                value={ link }
                onChange={ ( val ) => {
                    setAttributes( { link:  val } );
                }}
            />

          <TextControl
                identifier='id'
                label='Anchor ID'
                // help='to come.'
                value={ id }
                onChange={ ( val ) => {
                  setAttributes( { id: val } );
                }}
            />
          </PanelBody>
        </InspectorControls>
        <article className='vf-card vf-card--brand vf-card--bordered' id={id}>
          <div class="undrr-card__top">
            {subheading ? <span className="vf-card__subheading">{subheading}</span> : false }
            {mediaID ? <img src={mediaURL} alt={mediaID} className="vf-card__image" loading="lazy" /> : false }
          </div>
          <div className="vf-card__content | vf-stack vf-stack--400">
            <h3 className="vf-card__heading">
              {link ? <a className="vf-card__link" href={link}>{title}</a> : <Fragment>{title}</Fragment> }
            </h3>
            <div className="vf-card__text">
              <RichText
                  { ...blockProps }
                  identifier='cardBody'
                  tagName='p' 
                  label='Card content'
                  value={ cardBody }
                  allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] } 
                  onChange={ ( content ) => setAttributes( { cardBody: content } ) } 
                  placeholder={ __( 'Content...' ) } 
              />
            </div>
          </div>
        </article>
      </Fragment>
    );

  },

  save({ attributes }) {
    let { id, title, subheading, link, mediaID, mediaURL, cardBody } = attributes;
    const blockProps = useBlockProps.save();
    const attr = {
      className: `vf-card vf-card--brand vf-card--bordered`
    };
    if (id !== '') {
      attr.id = `vf-card-${id}`;
    }
    return (
      <article {...attr}>
        <div class="undrr-card__top">
          {subheading ? <span className="vf-card__subheading">{subheading}</span> : false }
          {mediaID ? <img src={mediaURL} alt={mediaID} className="vf-card__image" loading="lazy" /> : false }
        </div>
        <div className="vf-card__content | vf-stack vf-stack--400">
          <h3 className="vf-card__heading">
            {link ? <a className="vf-card__link" href={link}>{title}</a> : <Fragment>{title}</Fragment> }
          </h3>
          <div className="vf-card__text">
            <RichText.Content 
            { ...blockProps } 
            tagName="p" 
            value={ cardBody } />
          </div>
        </div>
      </article>
    );
  },
};

const category = {
  slug: 'undrr',
  title: __('UNDRR'),
};

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([ category, ...currentCategories ]);

registerBlockType(`${category.slug}/undrr-card`, { category: category.slug, ...undrrCardSettings });
