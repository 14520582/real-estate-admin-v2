/**
 * Default Configuration
 *
 * You can edit these options to change the default options. All these options also can be changed per component
 * basis. See `app/layouts/components/pages/authentication/login/login.component.ts` constructor method to learn more
 * about changing these options per component basis.
 */
export const layoutConfig = {
    layout          : {
        toolbar         : 'below', // 'above', 'below', 'none'
        footer          : 'none', // 'above', 'below', 'none'
        mode            : 'fullwidth' // 'boxed', 'fullwidth'
    },
    colorClasses    : {
        toolbar: 'toolbar-bg',
        footer : 'mat-fuse-dark-900-bg'
    },
    customScrollbars: true,
    routerAnimation : 'fadeIn' // fadeIn, slideUp, slideDown, slideRight, slideLeft, none
};
