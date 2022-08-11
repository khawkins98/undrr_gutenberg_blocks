const { useCallback, useEffect } = React;
const { blocks, data, element, components, blockEditor } = wp;
const { registerBlockType, createBlock } = blocks;
const { dispatch, select, useDispatch } = data;
const { Fragment } = element;
const { Button, PanelBody, BaseControl, Icon, RangeControl, TextControl, IconButton, Toolbar, SelectControl } = components;
const { InnerBlocks, RichText, InspectorControls, PanelColorSettings, BlockControls, useBlockProps  } = blockEditor;
const __ = Drupal.t;

const undrrTabsSettings = {
  title: __('UNDRR Tabs block'),
  description: __('A tabs container'),
  icon: 'admin-site-alt3',
  supports: {
    align: false,
    className: false,
    customClassName: false,
    html: false
  },
  attributes: {
    ver: {
      type: 'string'
    },
    dirty: {
      type: 'integer',
      default: 0
    },
    tabs: {
      type: 'array',
      default: []
    },
    title: {
      type: 'string',
    },
    subtitle: {
      type: 'string',
    },
    heroHeight: {
      type: 'integer',
    },
    heroVariant: {
      type: 'string'
    },
    text: {
      type: 'string',
    },
    allowedTypes: {
      type: 'array',
      default: ['image'],
    },
},

  edit({ attributes, setAttributes, clientId }) {
    const { dirty, tabs } = attributes;
    const {getBlockOrder, getBlocks} = select('core/block-editor');
    const {replaceInnerBlocks, selectBlock} = useDispatch('core/block-editor');

    const getTabs = () => {
      return getBlocks(clientId);
    };
    const getTabsOrder = () => {
      return getBlockOrder(clientId);
    };
    const appendTab = () => {
      const innerTabs = getTabs();
      innerTabs.push(createBlock('undrr/undrr-tabs-section', {}, []));
      replaceInnerBlocks(clientId, innerTabs, false);
      selectBlock(innerTabs.slice(-1)[0].clientId);
    };
    const updateTabs = () => {
      const innerTabs = getTabs();
      const newTabs = [];
      innerTabs.forEach((block) => {
        const {id, label} = block.attributes;
        newTabs.push({
          id,
          label
        });
      });
      setAttributes({dirty: 0, tabs: newTabs});
    };


    // Flag as "dirty" if the tabs and inner blocks do not match
    useEffect(() => {
      if (dirty === 0) {
        if (Object.keys(tabs).length !== getTabs().length) {
          setAttributes({dirty: Date.now()});
        }
      }
    }, [getTabs().length]);

    // Update attributes if the block is flagged as "dirty"
    useEffect(() => {
      if (dirty > 0) {
        updateTabs();
      }
    }, [dirty]);

    // Inspector controls
    const fields = [
      {
        control: 'button',
        label: __('Add Tab'),
        isSecondary: true,
        icon: 'insert',
        onClick: () => {
          appendTab();
        }
      }
    ];

    // Return inner blocks and inspector controls
    const blockProps = useBlockProps({className: 'vf-tabs'});
    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Settings')} initialOpen>
            <IconButton
              isPrimary
              className="wp-block-cloudblocks-feature-box__image-button"
              label={__('Add Tab')}
              icon="insert"
              onClick={appendTab}
            >
              Add tab
            </IconButton> 

          </PanelBody>
        </InspectorControls>
        <div {...blockProps} data-ver={attributes.ver}>
          <ul className='vf-tabs__list'>
            {attributes.tabs.map((tab, i) => {
              return (
                <li key={i + tab.id} className='vf-tabs__item'>
                  <a className='vf-tabs__link' onClick={() => selectTab(i)}>
                    {tab.label}
                  </a>
                </li>
              );
            })}
            <li className='vf-tabs__item'>
              <Button {...fields[0]} isTertiary isSecondary={false}>
                <span>{fields[0].label}</span>
              </Button>
            </li>
          </ul>
          <InnerBlocks
            allowedBlocks={['undrr/undrr-tabs']}
            template={Array(1).fill(['undrr/undrr-tabs-section'])}
          />
        </div>
      </Fragment>
    );

  },

  save({ className, attributes }) {
    // const { title, subtitle, heroHeight, heroVariant, text } = attributes;
    const blockProps = useBlockProps.save({className: 'vf-tabs'});

    return (
      <div {...blockProps}>
        <ul className='vf-tabs__list' data-vf-js-tabs>
          {attributes.tabs.map((tab, i) => {
            return (
              <li key={i + tab.id} className='vf-tabs__item'>
                <a className='vf-tabs__link' href={`#vf-tabs__section-${tab.id}`}>
                  {tab.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className='vf-tabs-content' data-vf-js-tabs-content>
          <InnerBlocks.Content />
        </div>
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

registerBlockType(`${category.slug}/undrr-tabs-block`, { category: category.slug, ...undrrTabsSettings });
