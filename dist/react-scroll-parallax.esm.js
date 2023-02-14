import { ParallaxController, parseValueAndUnit, ScrollAxis } from 'parallax-controller';
export { EasingPreset } from 'parallax-controller';
import React, { useEffect, useContext, useRef, useState, Component } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function removeUndefinedObjectKeys(obj) {
  Object.keys(obj).forEach(function (key) {
    return obj[key] === undefined ? delete obj[key] : {};
  });
  return obj;
}

var _excluded = ["disabled", "easing", "endScroll", "onChange", "onEnter", "onExit", "onProgressChange", "opacity", "rootMargin", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "shouldAlwaysCompleteAnimation", "shouldDisableScalingTranslations", "speed", "startScroll", "targetElement", "translateX", "translateY"];
function getIsolatedParallaxProps(props) {
  var disabled = props.disabled,
      easing = props.easing,
      endScroll = props.endScroll,
      onChange = props.onChange,
      onEnter = props.onEnter,
      onExit = props.onExit,
      onProgressChange = props.onProgressChange,
      opacity = props.opacity,
      rootMargin = props.rootMargin,
      rotate = props.rotate,
      rotateX = props.rotateX,
      rotateY = props.rotateY,
      rotateZ = props.rotateZ,
      scale = props.scale,
      scaleX = props.scaleX,
      scaleY = props.scaleY,
      scaleZ = props.scaleZ,
      shouldAlwaysCompleteAnimation = props.shouldAlwaysCompleteAnimation,
      shouldDisableScalingTranslations = props.shouldDisableScalingTranslations,
      speed = props.speed,
      startScroll = props.startScroll,
      targetElement = props.targetElement,
      translateX = props.translateX,
      translateY = props.translateY,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var parallaxProps = removeUndefinedObjectKeys({
    disabled: disabled,
    easing: easing,
    endScroll: endScroll,
    onChange: onChange,
    onEnter: onEnter,
    onExit: onExit,
    onProgressChange: onProgressChange,
    opacity: opacity,
    rootMargin: rootMargin,
    rotate: rotate,
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
    scale: scale,
    scaleX: scaleX,
    scaleY: scaleY,
    scaleZ: scaleZ,
    shouldAlwaysCompleteAnimation: shouldAlwaysCompleteAnimation,
    shouldDisableScalingTranslations: shouldDisableScalingTranslations,
    speed: speed,
    startScroll: startScroll,
    targetElement: targetElement,
    translateX: translateX,
    translateY: translateY
  });
  return {
    parallaxProps: parallaxProps,
    rest: rest
  };
}

function useVerifyController(controller) {
  useEffect(function () {
    var isServer = typeof window === 'undefined'; // Make sure the provided controller is an instance of the Parallax Controller

    var isInstance = controller instanceof ParallaxController; // Throw if neither context or global is available

    if (!isServer && !controller && !isInstance) {
      throw new Error("Must wrap your application's <Parallax /> components in a <ParallaxProvider />.");
    }
  }, [controller]);
}

var ParallaxContext = /*#__PURE__*/React.createContext(null);

function useParallaxController() {
  var parallaxController = useContext(ParallaxContext);
  var isServer = typeof window === 'undefined';

  if (isServer) {
    return null;
  }

  if (!parallaxController) {
    throw new Error('Could not find `react-scroll-parallax` context value. Please ensure the component is wrapped in a <ParallaxProvider>');
  }

  return parallaxController;
}

function useParallax(props) {
  var controller = useParallaxController();
  var ref = useRef(null);

  var _getIsolatedParallaxP = getIsolatedParallaxProps(props),
      parallaxProps = _getIsolatedParallaxP.parallaxProps;

  useVerifyController(controller);

  var _useState = useState(),
      element = _useState[0],
      setElement = _useState[1]; // create element


  useEffect(function () {
    var newElement;

    if (ref.current instanceof HTMLElement) {
      var options = {
        el: ref.current,
        props: parallaxProps
      };
      newElement = controller == null ? void 0 : controller.createElement(options);
      setElement(newElement);
    } else {
      throw new Error('You must assign the ref returned by the useParallax() hook to an HTML Element.');
    }

    return function () {
      if (newElement) {
        controller == null ? void 0 : controller.removeElementById(newElement.id);
      }
    };
  }, []); // update element

  useEffect(function () {
    if (element) {
      if (props.disabled) {
        controller == null ? void 0 : controller.resetElementStyles(element);
        controller == null ? void 0 : controller.updateElementPropsById(element.id, parallaxProps);
      } else {
        controller == null ? void 0 : controller.updateElementPropsById(element.id, parallaxProps);
      }
    }
  }, [props.disabled, props.easing, props.endScroll, props.onChange, props.onEnter, props.onExit, props.onProgressChange, props.opacity, props.rootMargin, props.rotate, props.rotateX, props.rotateY, props.rotateZ, props.scale, props.scaleX, props.scaleY, props.scaleZ, props.shouldAlwaysCompleteAnimation, props.shouldDisableScalingTranslations, props.speed, props.startScroll, props.targetElement, props.translateX, props.translateY]);
  return {
    ref: ref,
    controller: controller,
    element: element
  };
}

function Parallax(props) {
  var _getIsolatedParallaxP = getIsolatedParallaxProps(props),
      parallaxProps = _getIsolatedParallaxP.parallaxProps,
      rest = _getIsolatedParallaxP.rest;

  var _useParallax = useParallax(parallaxProps),
      ref = _useParallax.ref;

  return React.createElement("div", Object.assign({
    ref: ref
  }, rest), props.children);
}

var FALLBACK_RECT = {
  height: 0
};
function getExpandedStyle(layer) {
  if (Array.isArray(layer.translateY)) {
    var translateYStart = parseValueAndUnit(layer.translateY[0]);
    var translateYEnd = parseValueAndUnit(layer.translateY[1]);

    if (translateYStart.unit === 'px' && translateYEnd.unit === 'px') {
      return {
        top: Math.abs(translateYEnd.value) * -1 + "px",
        bottom: Math.abs(translateYStart.value) * -1 + "px"
      };
    }

    if (translateYStart.unit === '%' && translateYEnd.unit === '%') {
      var _layer$targetElement;

      var clientRect = ((_layer$targetElement = layer.targetElement) == null ? void 0 : _layer$targetElement.getBoundingClientRect()) || FALLBACK_RECT;
      var top = Math.abs(clientRect.height * 0.01 * translateYEnd.value) * -1;
      var bottom = Math.abs(clientRect.height * 0.01 * translateYStart.value) * -1;
      return {
        top: top + "px",
        bottom: bottom + "px"
      };
    }
  }

  if (layer.speed) {
    var speed = layer.speed || 0;
    return {
      top: Math.abs(speed) * 10 * -1 + 'px',
      bottom: Math.abs(speed) * 10 * -1 + 'px'
    };
  }

  return {};
}

function getImageStyle(layer) {
  return layer.image ? {
    backgroundImage: "url(" + layer.image + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  } : {};
}

var _excluded$1 = ["children", "disabled", "style", "expanded", "image", "testId"];
var absoluteStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
var ParallaxBannerLayer = function ParallaxBannerLayer(props) {
  var _getIsolatedParallaxP = getIsolatedParallaxProps(props),
      parallaxProps = _getIsolatedParallaxP.parallaxProps,
      rest = _getIsolatedParallaxP.rest;

  var style = rest.style,
      _rest$expanded = rest.expanded,
      expanded = _rest$expanded === void 0 ? true : _rest$expanded,
      testId = rest.testId,
      divProps = _objectWithoutPropertiesLoose(rest, _excluded$1);

  var imageStyle = getImageStyle(props);
  var expandedStyle = expanded ? getExpandedStyle(props) : {};
  var parallax = useParallax(_extends({
    targetElement: props.targetElement,
    shouldDisableScalingTranslations: true
  }, parallaxProps));
  return React.createElement("div", Object.assign({
    "data-testid": testId,
    ref: parallax.ref,
    style: _extends({}, imageStyle, absoluteStyle, expandedStyle, style)
  }, divProps), rest.children);
};

var _excluded$2 = ["disabled", "style", "layers"];
var containerStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%'
};
var ParallaxBanner = function ParallaxBanner(props) {
  var _useState = useState(null),
      targetElement = _useState[0],
      setTargetElement = _useState[1];

  var containerRef = useRef(null);
  useEffect(function () {
    setTargetElement(containerRef.current);
  }, []);

  var rootStyle = props.style,
      _props$layers = props.layers,
      layers = _props$layers === void 0 ? [] : _props$layers,
      rootRest = _objectWithoutPropertiesLoose(props, _excluded$2);

  function renderLayers() {
    if (targetElement) {
      var shouldUseLayers = layers && layers.length > 0;

      if (shouldUseLayers) {
        return layers.map(function (layer, i) {
          return React.createElement(ParallaxBannerLayer, Object.assign({}, layer, {
            targetElement: targetElement,
            key: "layer-" + i,
            testId: "layer-" + i
          }));
        });
      }
    }

    return null;
  }

  function renderChildren() {
    if (targetElement) {
      return React.Children.map(props.children, function (child) {
        var item = child; // adds the targetElement prop to any ParallaxBannerLayer components

        if ((item == null ? void 0 : item.type) === ParallaxBannerLayer) {
          var clone = React.cloneElement(item, {
            targetElement: targetElement
          });
          return clone;
        }

        return child;
      });
    }

    return null;
  }

  return React.createElement("div", Object.assign({
    ref: containerRef,
    style: _extends({}, containerStyle, rootStyle)
  }, rootRest), renderLayers(), renderChildren());
};

var createController = function createController(options) {
  // Don't initialize on the server
  var isServer = typeof window === 'undefined';

  if (!isServer) {
    // Must not be the server so kick it off...
    return ParallaxController.init(options);
  }

  return null;
};

var ParallaxProvider = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ParallaxProvider, _Component);

  function ParallaxProvider(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.controller = createController({
      scrollAxis: props.scrollAxis,
      scrollContainer: props.scrollContainer
    });
    return _this;
  }

  var _proto = ParallaxProvider.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.scrollContainer !== this.props.scrollContainer) {
      // @ts-ignore
      this.controller.updateScrollContainer(this.props.scrollContainer);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    // @ts-ignore
    this.controller = this.controller.destroy();
  };

  _proto.render = function render() {
    var children = this.props.children;
    return (// @ts-ignore
      React.createElement(ParallaxContext.Provider, {
        value: this.controller
      }, children)
    );
  };

  return ParallaxProvider;
}(Component);
ParallaxProvider.defaultProps = {
  scrollAxis: ScrollAxis.vertical
};

export { Parallax, ParallaxBanner, ParallaxBannerLayer, ParallaxContext, ParallaxProvider, useParallax, useParallaxController };
//# sourceMappingURL=react-scroll-parallax.esm.js.map
