const { blocks, data, element, components, blockEditor } = wp;
const { registerBlockType } = blocks;
const { dispatch, select } = data;
const { Fragment } = element;
const { PanelBody, BaseControl, Icon, RangeControl, IconButton, Toolbar, SelectControl } = components;
const { InnerBlocks, RichText, InspectorControls, PanelColorSettings, MediaUpload, BlockControls } = blockEditor;
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
    text: {
      type: 'string',
    },
  },

  edit({ className, attributes, setAttributes, isSelected }) {
    const { title, subtitle, text } = attributes;

    return (
      <Fragment>
      <section className={className + ' vf-hero | vf-u-fullbleed'}>
        <div className="vf-hero__content | vf-box | vf-stack vf-stack--400">
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
            <div>{title}</div>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save({ className, attributes }) {
    const { title, subtitle, text } = attributes;

    return (
      <section className={className + ' vf-hero | vf-u-fullbleed'}>
        {/* style="--vf-hero--bg-image: url('https://acxngcvroo.cloudimg.io/v7/https://www.embl.org/files/wp-content/uploads/vf-hero-intense.png')" */}
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
      </section>
    );
  },
};


const exampleBlockSettings = {
  title: __('UNDRR Example Block'),
  description: __('UNDRR Example Block'),
  icon: 'welcome-learn-more',
  attributes: {
    title: {
      type: 'string',
    },
    subtitle: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
  },

  edit({ className, attributes, setAttributes, isSelected }) {
    const { title, subtitle, text } = attributes;

    return (
      <Fragment>
        <div className={className}>
          <div className="column">
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
          <div className="column">
            <div className="icon">
              <Icon icon="welcome-learn-more" />
            </div>
            {isSelected && (
              <div className="info">
                <p>This is Gutenberg's example block.</p>
                <p>To test it just fill the "fields" on the left and save.</p>
              </div>
            )}
          </div>
        </div>
        <InspectorControls>
          <PanelBody title={ __('Block Settings') }>
            <div>{title}</div>
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  },

  save({ className, attributes }) {
    const { title, subtitle, text } = attributes;

    return (
      <div className={className}>
        <div className="column">
          {title && (
            <h2>{title}</h2>
          )}
          {subtitle && (
            <div>{subtitle}</div>
          )}
          {text && (
            <p>{text}</p>
          )}
        </div>
        <div className="column">
          <div className="icon">
            <Icon icon="welcome-learn-more" />
          </div>
        </div>
      </div>
    );
  },
};

const dynamicBlockSettings = {
    title: __('UNDRR Example Dynamic Block'),
    description: __('UNDRR example dynamic block that can be rendered server-side.'),
    icon: 'welcome-learn-more',
    attributes: {
        title: {
            type: 'string',
        },
    },

    edit({ className, attributes, setAttributes, isSelected }) {
        const { title } = attributes;

        return (
            <div className={className}>
                <div>— Hello from the Gutenberg JS editor.</div>
                <div className="dynamic-block-title">
                    <RichText
                        identifier="title"
                        tagName="h2"
                        value={title}
                        placeholder={__('Title goes here')}
                        onChange={title => {
                            setAttributes({
                                title: title,
                            });
                        }}
                        onSplit={() => null}
                        unstableOnSplit={() => null}
                    />
                </div>
                <div className="dynamic-block-content">
                    <InnerBlocks />
                </div>
            </div>
        );
    },

    save({ className, attributes }) {
        const { title } = attributes;

        // Save the inner content block.
        return (
          <div className={className}>
          {title && (
            <h2>{title}</h2>
          )}
          <InnerBlocks.Content />
          </div>
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
registerBlockType(`${category.slug}/example-block`, { category: category.slug, ...exampleBlockSettings });
registerBlockType(`${category.slug}/dynamic-block`, { category: category.slug, ...dynamicBlockSettings });
