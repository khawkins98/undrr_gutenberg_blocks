const { useCallback, useEffect } = React;
const { blocks, data, element, components, blockEditor } = wp;
const { registerBlockType, createBlock } = blocks;
const { dispatch, select, useDispatch, useSelect } = data;
const { useState, Fragment } = element;
const { Button, PanelBody, BaseControl, Icon, RangeControl, TextControl, ToggleControl } = components;
const { InnerBlocks, RichText, InspectorControls, PanelColorSettings, BlockControls, useBlockProps  } = blockEditor;
const __ = Drupal.t;

const undrrTabsSettings = {
  title: __('UNDRR Tabs section'),
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

  edit({ attributes, setAttributes, clientId }) {
    const {removeBlock, updateBlockAttributes} = useDispatch('core/block-editor');
    let  {id, label, unlabelled} = attributes;
    if (id === '') {
      setAttributes({id: clientId});
    }
    // if (label === '') {
    //   setAttributes({label: __(`Tab ${tabOrder}`)});
    // }

    // if (ver !== attributes.ver) {
    //   attributes.setAttributes({ver});
    // }
  
    const {tabOrder, updateTabs} = useSelect(
      (select) => {
        const {getBlockOrder, getBlockRootClientId} = select('core/block-editor');
        const rootClientId = getBlockRootClientId(clientId);
        const parentBlockOrder = getBlockOrder(rootClientId);
        return {
          tabOrder: parentBlockOrder.indexOf(clientId) + 1,
          updateTabs: () => {
            updateBlockAttributes(rootClientId, {
              dirty: Date.now()
            });
          }
        };
      },
      [clientId]
    );
    
    // Default to the `clientId` for the ID attribute

    // Default to "Tab [N]" for the tab heading
    useEffect(() => {
      if (label === '') {
        setAttributes({label: __(`Tab ${tabOrder}`)});
      }
    }, [label]);

    // Flag the parent tabs block as "dirty" if any attributes change
    useEffect(() => {
      updateTabs();
    }, [id, label, tabOrder]);

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

    const [ headingIsHidden, setHeadingIsHidden ] = useState( true );

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Settings')} initialOpen>
          <TextControl
                identifier='label'
                label='Tab label'
                help='to come.'
                value={ label }
                onChange={ ( val ) => {
                    setAttributes( { label:  val } );
                }}
            />
          <ToggleControl 
                identifier='unlabelled'
                label='Hide heading'
                // help='to come.'
                help={
                  unlabelled
                      ? 'Heading hidden.'
                      : 'Heading shown.'
                }
                checked={ unlabelled }
                onChange={ (value) => {
                  setHeadingIsHidden(( value ) => ! value)
                  unlabelled = headingIsHidden;
                  setAttributes( { unlabelled: value } );
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
          <Button
                label='Delete tab'
                text='Delete tab'
                isSecondary='true'
                isDestructive='true'
                value={ id }
                onClick={ () => {
                  removeBlock(clientId, false);
                }}
            />
          </PanelBody>
        </InspectorControls>
        <div className='vf-tabs__section'>
          {attributes.unlabelled ? false : <h2>{label}</h2>}
          <InnerBlocks />
        </div>
      </Fragment>
    );

  },

  save({ attributes }) {
    let { id, label, unlabelled } = attributes;
    // const blockProps = useBlockProps.save({className: 'vf-tabs'});

    const attr = {
      className: `vf-tabs__section`
    };
    if (id !== '') {
      attr.id = `vf-tabs__section-${id}`;
    }
    const heading = {};
    if (unlabelled === true) {
      heading.className = 'vf-u-sr-only';
    }
    return (
      <section {...attr}>
        <h2 {...heading}>{label}</h2>
        <InnerBlocks.Content />
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

registerBlockType(`${category.slug}/undrr-tabs-section`, { category: category.slug, ...undrrTabsSettings });
