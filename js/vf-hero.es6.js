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

    const vfHeroStyles = {
      "--vf-hero--bg-image": "url('" + mediaURL + "')",
      "--vf-hero--bg-image-size": "auto 28.5rem"
    };
    const blockProps = useBlockProps( { style: vfHeroStyles } );

    return (
      <Fragment>
      <section {...blockProps} className={className + ' vf-hero vf-hero--' + heroPadding + ' | vf-u-fullbleed'}>
        <div className="vf-hero__content | vf-box | vf-stack vf-stack--400" >
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

    const vfHeroStyles = {
      "--vf-hero--bg-image": "url('" + mediaURL + "')",
      "--vf-hero--bg-image-size": "auto 28.5rem"
    };
    
    return (
      <section style={vfHeroStyles} className={className + ' vf-hero vf-hero--' + heroPadding + ' | vf-u-fullbleed'}>
        <div className="vf-hero__content | vf-box | vf-stack vf-stack--400">
          {/* <p class="vf-hero__kicker"><a href="JavaScript:Void(0);">VF </a> | Structural Biology</p> */}
          {title && (
            <h2 class="vf-hero__heading">{title}</h2>
          )}
          {subtitle && (
            <p class="vf-hero__subheading">{subtitle}</p>
          )}
          {text && (
            <p class="vf-hero__text">{text}</p> 
          )}
          <a class="vf-hero__link" href="JavaScript:Void(0);">Learn more<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12S18.627 0 12 0C5.376.008.008 5.376 0 12zm13.707-5.209l4.5 4.5a1 1 0 010 1.414l-4.5 4.5a1 1 0 01-1.414-1.414l2.366-2.367a.25.25 0 00-.177-.424H6a1 1 0 010-2h8.482a.25.25 0 00.177-.427l-2.366-2.368a1 1 0 011.414-1.414z" fill="" fill-rule="nonzero"></path></svg></a>
        </div>
        {/* This is requird to get the media to save? I'm bad at react. */}
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
