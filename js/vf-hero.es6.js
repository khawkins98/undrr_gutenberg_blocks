const { blocks, data, element, components, blockEditor } = wp;
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { Fragment } = element;
const { PanelBody, BaseControl, Icon, RangeControl, TextControl, IconButton, Toolbar, SelectControl } = components;
const { InnerBlocks, RichText, InspectorControls, PanelColorSettings, MediaUpload, MediaBrowser, MediaPlaceholder, BlockControls, useBlockProps  } = blockEditor;
const __ = Drupal.t;

const undrrHeroSettings = {
  title: __('UNDRR Hero block'),
  description: __('A hero to call attention'),
  icon: 'admin-site-alt3',
  attributes: {
    title: {
      type: 'string',
    },
    subtitle: {
      type: 'string',
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
    heroHeight: {
      type: 'integer',
    },
    heroPadding: {
      type: 'integer'
    },
    text: {
      type: 'string',
    },
    allowedTypes: {
      type: 'array',
      default: ['image'],
    },
},

  edit({ className, attributes, setAttributes, mediaID, isSelected }) {
    const { title, mediaURL, subtitle, text, heroPadding } = attributes;

    // let mediaID = mediaID || "tocome";
    // mediaURL = mediaURL || "tocome";
    // console.log('mediaURL',mediaURL)

    const undrrHeroStyles = {
      "background-image": "url('" + mediaURL + "')",
      "background-size": "auto 28.5rem"
    };
    const blockProps = useBlockProps( { style: undrrHeroStyles } );
    // style="any-custom-background-colour-desired min-height: 300px;"
    return (
      <Fragment>
        <section {...blockProps} className={className + ' undrr-hero vxxxxf-hero--' + heroPadding}>
          <div className="container | undrr-hero--inner" >
            <div class="undrr-hero--description left">
              <RichText
                identifier="title"
                tagName="h2"
                value={title}
                placeholder={__('Title')}
                onChange={nextTitle => {
                  setAttributes({
                    title: nextTitle,
                  });
                }}
                onSplit={() => null}
                unstableOnSplit={() => null}
              />

              <RichText
                identifier="subtitle"
                tagName="div"
                value={subtitle}
                placeholder={__('Subtitle goes here')}
                onChange={nextSubtitle => {
                  setAttributes({
                    subtitle: nextSubtitle,
                  });
                }}
                onSplit={() => null}
                unstableOnSplit={() => null}
              />

              <RichText
                identifier="text"
                tagName="p"
                value={text}
                placeholder={__('Text')}
                onChange={nextText => {
                  setAttributes({
                    text: nextText,
                  });
                }}
              />
            </div>
          </div>
        </section>
        <InspectorControls>
          <PanelBody title={ __('Block Settings') }>
            {/* <div>{title}</div> */}
            <h2>Background image</h2>
            
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
            {/* <MediaUpload
              onSelect= {
                (media) => {
                  setAttributes({
                    mediaURL: media.url,
                    mediaID: media.id,
                  });
                }
              }
              multiple={false}
              handlesMediaEntity={true}
              type="image"
              // value={mediaID}
              render={
                ({ open }) => (
                  <button className="button" onClick={open}>
                    Open media library
                  </button>
                )}
            /> */}



            <SelectControl
                label="Hero padding"
                value={ heroPadding }
                options={ [
                    { label: 'default', value: '0' },
                    { label: '400', value: '400' },
                    { label: '800', value: '800' },
                    { label: '1200', value: '1200' },
                ] }
                onChange={ ( val ) => {
                  setAttributes( { heroPadding: parseInt( val ) } );
                }}
                __nextHasNoMarginBottom
            />
            <TextControl
                label='Height'
                value={ attributes.heroHeight }
                onChange={ ( val ) => {
                    setAttributes( { heroHeight: parseInt( val ) } );
                }}
            />              
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save({ className, attributes }) {
    const { title, subtitle, mediaID, mediaURL, heroHeight, heroPadding, text } = attributes;

    const undrrHeroStyles = {
      "background-image": "url('" + mediaURL + "')",
      "background-size": "auto 28.5rem"
    };
    
    return (
      <section style={undrrHeroStyles} className={className + ' undrr-hero xxxx-hero--' + heroPadding}>
        <div className="container | undrr-hero--inner">
          <div class="undrr-hero--description left">
            {title && (
              <h2 class="undrr-hero__heading">{title}</h2>
            )}
            {subtitle && (
              <p class="undrr-hero__subheading">{subtitle}</p>
            )}
            {text && (
              {text}
            )}
          </div>
        </div>
        {/* This is requird to get the media to save? nb. I'm bad at react. */}
        <img
          className="hide"
          src={ mediaURL }
          alt=""
          aria-hidden="true"
        />
      </section>
    );
  },
};


const category = {
  slug: 'undrr',
  title: __('UNDRR'),
};

const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);
dispatch('core/blocks').setCategories([ category, ...currentCategories ]);

registerBlockType(`${category.slug}/undrr-hero-block`, { category: category.slug, ...undrrHeroSettings });
