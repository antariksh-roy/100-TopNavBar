/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import styles from '../../utils/assets/headerStyle';

import HeaderLinks from './HeaderLinks';

const useStyles = makeStyles(styles);

const color = 'transparent';
const fixed = true;
const changeColorOnScroll = {
    height: 400,
    color: 'white',
};
const absolute = false;

export default function NavBar(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    React.useEffect(() => {
        if (changeColorOnScroll) {
            window.addEventListener('scroll', headerColorChange);
        }
        return function cleanup() {
            if (changeColorOnScroll) {
                window.removeEventListener('scroll', headerColorChange);
            }
        };
    });
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const headerColorChange = () => {
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > changeColorOnScroll.height) {
            document.body
                .getElementsByTagName('header')[0]
                .classList.remove(classes[color]);
            document.body
                .getElementsByTagName('header')[0]
                .classList.add(classes[changeColorOnScroll.color]);
        } else {
            document.body
                .getElementsByTagName('header')[0]
                .classList.add(classes[color]);
            document.body
                .getElementsByTagName('header')[0]
                .classList.remove(classes[changeColorOnScroll.color]);
        }
    };
    const { leftLinks } = props;
    const appBarClasses = classNames({
        [classes.appBar]: true,
        [classes[color]]: color,
        [classes.absolute]: absolute,
        [classes.fixed]: fixed,
    });
    const brandComponent = (
        <Button className={classes.title}>
            <FormattedMessage {...messages.brand} />
        </Button>
    );
    return (
        <AppBar className={appBarClasses}>
            <Toolbar className={classes.container}>
                {leftLinks !== undefined ? brandComponent : null}
                <div className={classes.flex}>
                    {leftLinks !== undefined ? (
                        <Hidden smDown implementation="css">
                            {leftLinks}
                        </Hidden>
                    ) : (
                        brandComponent
                    )}
                </div>
                <Hidden smDown implementation="css">
                    <HeaderLinks />
                </Hidden>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
            <Hidden mdUp implementation="js">
                <Drawer
                    variant="temporary"
                    anchor={'right'}
                    open={mobileOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    onClose={handleDrawerToggle}
                >
                    <div className={classes.appResponsive}>
                        {leftLinks}
                        <HeaderLinks />
                    </div>
                </Drawer>
            </Hidden>
        </AppBar>
    );
}

NavBar.defaultProp = {
    color: 'white',
};

NavBar.propTypes = {
    color: PropTypes.oneOf([
        'primary',
        'info',
        'success',
        'warning',
        'danger',
        'transparent',
        'white',
        'rose',
        'dark',
    ]),
    rightLinks: PropTypes.node,
    leftLinks: PropTypes.node,
    brand: PropTypes.string,
    fixed: PropTypes.bool,
    absolute: PropTypes.bool,
    // this will cause the sidebar to change the color from
    // props.color (see above) to changeColorOnScroll.color
    // when the window.pageYOffset is heigher or equal to
    // changeColorOnScroll.height and then when it is smaller than
    // changeColorOnScroll.height change it back to
    // props.color (see above)
    changeColorOnScroll: PropTypes.shape({
        height: PropTypes.number.isRequired,
        color: PropTypes.oneOf([
            'primary',
            'info',
            'success',
            'warning',
            'danger',
            'transparent',
            'white',
            'rose',
            'dark',
        ]).isRequired,
    }),
};
