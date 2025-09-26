import {
  FormGroupDirective,
  NgControl,
  NgForm,
  UniqueSelectionDispatcher,
  Validators
} from "./chunk-TPOMRMWK.js";
import {
  CdkPortalOutlet,
  LoadingService,
  PortalModule,
  TemplatePortal
} from "./chunk-LXHKEQQO.js";
import {
  ANIMATION_MODULE_TYPE,
  AsyncPipe,
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  Directionality,
  Directive,
  EMPTY,
  ENTER,
  ElementRef,
  EventEmitter,
  FocusKeyManager,
  FocusMonitor,
  HostAttributeToken,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  MatCommonModule,
  NgIf,
  NgModule,
  NgTemplateOutlet,
  NgZone,
  Observable,
  ObserversModule,
  Output,
  Platform,
  QueryList,
  Renderer2,
  RendererFactory2,
  SPACE,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  _CdkPrivateStyleLoader,
  _IdGenerator,
  _StructuralStylesLoader,
  _bindEventWithOptions,
  afterRender,
  auditTime,
  booleanAttribute,
  coerceBooleanProperty,
  coerceElement,
  coerceNumberProperty,
  computed,
  contentChild,
  distinctUntilChanged,
  effect,
  filter,
  getSupportedInputTypes,
  hasModifierKey,
  inject,
  isSignal,
  map,
  merge,
  numberAttribute,
  pairwise,
  setClassMetadata,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeUntil,
  timer,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵcontentQuerySignal,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-NCZTTRTX.js";

// node_modules/.pnpm/@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19.2.14_rxjs@7.8.2_zone.js@0_acf0b48f9f6c20839ed0337e05a1c5b6/node_modules/@angular/cdk/fesm2022/accordion.mjs
var CDK_ACCORDION = new InjectionToken("CdkAccordion");
var CdkAccordion = class _CdkAccordion {
  /** Emits when the state of the accordion changes */
  _stateChanges = new Subject();
  /** Stream that emits true/false when openAll/closeAll is triggered. */
  _openCloseAllActions = new Subject();
  /** A readonly id value to use for unique selection coordination. */
  id = inject(_IdGenerator).getId("cdk-accordion-");
  /** Whether the accordion should allow multiple expanded accordion items simultaneously. */
  multi = false;
  /** Opens all enabled accordion items in an accordion where multi is enabled. */
  openAll() {
    if (this.multi) {
      this._openCloseAllActions.next(true);
    }
  }
  /** Closes all enabled accordion items. */
  closeAll() {
    this._openCloseAllActions.next(false);
  }
  ngOnChanges(changes) {
    this._stateChanges.next(changes);
  }
  ngOnDestroy() {
    this._stateChanges.complete();
    this._openCloseAllActions.complete();
  }
  static \u0275fac = function CdkAccordion_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkAccordion)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkAccordion,
    selectors: [["cdk-accordion"], ["", "cdkAccordion", ""]],
    inputs: {
      multi: [2, "multi", "multi", booleanAttribute]
    },
    exportAs: ["cdkAccordion"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: CDK_ACCORDION,
      useExisting: _CdkAccordion
    }]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAccordion, [{
    type: Directive,
    args: [{
      selector: "cdk-accordion, [cdkAccordion]",
      exportAs: "cdkAccordion",
      providers: [{
        provide: CDK_ACCORDION,
        useExisting: CdkAccordion
      }]
    }]
  }], null, {
    multi: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkAccordionItem = class _CdkAccordionItem {
  accordion = inject(CDK_ACCORDION, {
    optional: true,
    skipSelf: true
  });
  _changeDetectorRef = inject(ChangeDetectorRef);
  _expansionDispatcher = inject(UniqueSelectionDispatcher);
  /** Subscription to openAll/closeAll events. */
  _openCloseAllSubscription = Subscription.EMPTY;
  /** Event emitted every time the AccordionItem is closed. */
  closed = new EventEmitter();
  /** Event emitted every time the AccordionItem is opened. */
  opened = new EventEmitter();
  /** Event emitted when the AccordionItem is destroyed. */
  destroyed = new EventEmitter();
  /**
   * Emits whenever the expanded state of the accordion changes.
   * Primarily used to facilitate two-way binding.
   * @docs-private
   */
  expandedChange = new EventEmitter();
  /** The unique AccordionItem id. */
  id = inject(_IdGenerator).getId("cdk-accordion-child-");
  /** Whether the AccordionItem is expanded. */
  get expanded() {
    return this._expanded;
  }
  set expanded(expanded) {
    if (this._expanded !== expanded) {
      this._expanded = expanded;
      this.expandedChange.emit(expanded);
      if (expanded) {
        this.opened.emit();
        const accordionId = this.accordion ? this.accordion.id : this.id;
        this._expansionDispatcher.notify(this.id, accordionId);
      } else {
        this.closed.emit();
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  _expanded = false;
  /** Whether the AccordionItem is disabled. */
  disabled = false;
  /** Unregister function for _expansionDispatcher. */
  _removeUniqueSelectionListener = () => {
  };
  constructor() {
  }
  ngOnInit() {
    this._removeUniqueSelectionListener = this._expansionDispatcher.listen((id, accordionId) => {
      if (this.accordion && !this.accordion.multi && this.accordion.id === accordionId && this.id !== id) {
        this.expanded = false;
      }
    });
    if (this.accordion) {
      this._openCloseAllSubscription = this._subscribeToOpenCloseAllActions();
    }
  }
  /** Emits an event for the accordion item being destroyed. */
  ngOnDestroy() {
    this.opened.complete();
    this.closed.complete();
    this.destroyed.emit();
    this.destroyed.complete();
    this._removeUniqueSelectionListener();
    this._openCloseAllSubscription.unsubscribe();
  }
  /** Toggles the expanded state of the accordion item. */
  toggle() {
    if (!this.disabled) {
      this.expanded = !this.expanded;
    }
  }
  /** Sets the expanded state of the accordion item to false. */
  close() {
    if (!this.disabled) {
      this.expanded = false;
    }
  }
  /** Sets the expanded state of the accordion item to true. */
  open() {
    if (!this.disabled) {
      this.expanded = true;
    }
  }
  _subscribeToOpenCloseAllActions() {
    return this.accordion._openCloseAllActions.subscribe((expanded) => {
      if (!this.disabled) {
        this.expanded = expanded;
      }
    });
  }
  static \u0275fac = function CdkAccordionItem_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkAccordionItem)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkAccordionItem,
    selectors: [["cdk-accordion-item"], ["", "cdkAccordionItem", ""]],
    inputs: {
      expanded: [2, "expanded", "expanded", booleanAttribute],
      disabled: [2, "disabled", "disabled", booleanAttribute]
    },
    outputs: {
      closed: "closed",
      opened: "opened",
      destroyed: "destroyed",
      expandedChange: "expandedChange"
    },
    exportAs: ["cdkAccordionItem"],
    features: [\u0275\u0275ProvidersFeature([
      // Provide `CDK_ACCORDION` as undefined to prevent nested accordion items from
      // registering to the same accordion.
      {
        provide: CDK_ACCORDION,
        useValue: void 0
      }
    ])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAccordionItem, [{
    type: Directive,
    args: [{
      selector: "cdk-accordion-item, [cdkAccordionItem]",
      exportAs: "cdkAccordionItem",
      providers: [
        // Provide `CDK_ACCORDION` as undefined to prevent nested accordion items from
        // registering to the same accordion.
        {
          provide: CDK_ACCORDION,
          useValue: void 0
        }
      ]
    }]
  }], () => [], {
    closed: [{
      type: Output
    }],
    opened: [{
      type: Output
    }],
    destroyed: [{
      type: Output
    }],
    expandedChange: [{
      type: Output
    }],
    expanded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkAccordionModule = class _CdkAccordionModule {
  static \u0275fac = function CdkAccordionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkAccordionModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _CdkAccordionModule,
    imports: [CdkAccordion, CdkAccordionItem],
    exports: [CdkAccordion, CdkAccordionItem]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAccordionModule, [{
    type: NgModule,
    args: [{
      imports: [CdkAccordion, CdkAccordionItem],
      exports: [CdkAccordion, CdkAccordionItem]
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/expansion.mjs
var _c0 = ["body"];
var _c1 = ["bodyWrapper"];
var _c2 = [[["mat-expansion-panel-header"]], "*", [["mat-action-row"]]];
var _c3 = ["mat-expansion-panel-header", "*", "mat-action-row"];
function MatExpansionPanel_ng_template_7_Template(rf, ctx) {
}
var _c4 = [[["mat-panel-title"]], [["mat-panel-description"]], "*"];
var _c5 = ["mat-panel-title", "mat-panel-description", "*"];
function MatExpansionPanelHeader_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 1);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 2);
    \u0275\u0275element(2, "path", 3);
    \u0275\u0275elementEnd()();
  }
}
var MAT_ACCORDION = new InjectionToken("MAT_ACCORDION");
var MAT_EXPANSION_PANEL = new InjectionToken("MAT_EXPANSION_PANEL");
var MatExpansionPanelContent = class _MatExpansionPanelContent {
  _template = inject(TemplateRef);
  _expansionPanel = inject(MAT_EXPANSION_PANEL, {
    optional: true
  });
  constructor() {
  }
  static \u0275fac = function MatExpansionPanelContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelContent)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatExpansionPanelContent,
    selectors: [["ng-template", "matExpansionPanelContent", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelContent, [{
    type: Directive,
    args: [{
      selector: "ng-template[matExpansionPanelContent]"
    }]
  }], () => [], null);
})();
var MAT_EXPANSION_PANEL_DEFAULT_OPTIONS = new InjectionToken("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");
var MatExpansionPanel = class _MatExpansionPanel extends CdkAccordionItem {
  _viewContainerRef = inject(ViewContainerRef);
  _animationsDisabled = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  }) === "NoopAnimations";
  _document = inject(DOCUMENT);
  _ngZone = inject(NgZone);
  _elementRef = inject(ElementRef);
  _renderer = inject(Renderer2);
  _cleanupTransitionEnd;
  /** Whether the toggle indicator should be hidden. */
  get hideToggle() {
    return this._hideToggle || this.accordion && this.accordion.hideToggle;
  }
  set hideToggle(value) {
    this._hideToggle = value;
  }
  _hideToggle = false;
  /** The position of the expansion indicator. */
  get togglePosition() {
    return this._togglePosition || this.accordion && this.accordion.togglePosition;
  }
  set togglePosition(value) {
    this._togglePosition = value;
  }
  _togglePosition;
  /** An event emitted after the body's expansion animation happens. */
  afterExpand = new EventEmitter();
  /** An event emitted after the body's collapse animation happens. */
  afterCollapse = new EventEmitter();
  /** Stream that emits for changes in `@Input` properties. */
  _inputChanges = new Subject();
  /** Optionally defined accordion the expansion panel belongs to. */
  accordion = inject(MAT_ACCORDION, {
    optional: true,
    skipSelf: true
  });
  /** Content that will be rendered lazily. */
  _lazyContent;
  /** Element containing the panel's user-provided content. */
  _body;
  /** Element wrapping the panel body. */
  _bodyWrapper;
  /** Portal holding the user's content. */
  _portal;
  /** ID for the associated header element. Used for a11y labelling. */
  _headerId = inject(_IdGenerator).getId("mat-expansion-panel-header-");
  constructor() {
    super();
    const defaultOptions = inject(MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, {
      optional: true
    });
    this._expansionDispatcher = inject(UniqueSelectionDispatcher);
    if (defaultOptions) {
      this.hideToggle = defaultOptions.hideToggle;
    }
  }
  /** Determines whether the expansion panel should have spacing between it and its siblings. */
  _hasSpacing() {
    if (this.accordion) {
      return this.expanded && this.accordion.displayMode === "default";
    }
    return false;
  }
  /** Gets the expanded state string. */
  _getExpandedState() {
    return this.expanded ? "expanded" : "collapsed";
  }
  /** Toggles the expanded state of the expansion panel. */
  toggle() {
    this.expanded = !this.expanded;
  }
  /** Sets the expanded state of the expansion panel to false. */
  close() {
    this.expanded = false;
  }
  /** Sets the expanded state of the expansion panel to true. */
  open() {
    this.expanded = true;
  }
  ngAfterContentInit() {
    if (this._lazyContent && this._lazyContent._expansionPanel === this) {
      this.opened.pipe(startWith(null), filter(() => this.expanded && !this._portal), take(1)).subscribe(() => {
        this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
      });
    }
    this._setupAnimationEvents();
  }
  ngOnChanges(changes) {
    this._inputChanges.next(changes);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._cleanupTransitionEnd?.();
    this._inputChanges.complete();
  }
  /** Checks whether the expansion panel's content contains the currently-focused element. */
  _containsFocus() {
    if (this._body) {
      const focusedElement = this._document.activeElement;
      const bodyElement = this._body.nativeElement;
      return focusedElement === bodyElement || bodyElement.contains(focusedElement);
    }
    return false;
  }
  _transitionEndListener = ({
    target,
    propertyName
  }) => {
    if (target === this._bodyWrapper?.nativeElement && propertyName === "grid-template-rows") {
      this._ngZone.run(() => {
        if (this.expanded) {
          this.afterExpand.emit();
        } else {
          this.afterCollapse.emit();
        }
      });
    }
  };
  _setupAnimationEvents() {
    this._ngZone.runOutsideAngular(() => {
      if (this._animationsDisabled) {
        this.opened.subscribe(() => this._ngZone.run(() => this.afterExpand.emit()));
        this.closed.subscribe(() => this._ngZone.run(() => this.afterCollapse.emit()));
      } else {
        setTimeout(() => {
          const element = this._elementRef.nativeElement;
          this._cleanupTransitionEnd = this._renderer.listen(element, "transitionend", this._transitionEndListener);
          element.classList.add("mat-expansion-panel-animations-enabled");
        }, 200);
      }
    });
  }
  static \u0275fac = function MatExpansionPanel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanel)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatExpansionPanel,
    selectors: [["mat-expansion-panel"]],
    contentQueries: function MatExpansionPanel_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatExpansionPanelContent, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lazyContent = _t.first);
      }
    },
    viewQuery: function MatExpansionPanel_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
        \u0275\u0275viewQuery(_c1, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._body = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._bodyWrapper = _t.first);
      }
    },
    hostAttrs: [1, "mat-expansion-panel"],
    hostVars: 4,
    hostBindings: function MatExpansionPanel_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-expanded", ctx.expanded)("mat-expansion-panel-spacing", ctx._hasSpacing());
      }
    },
    inputs: {
      hideToggle: [2, "hideToggle", "hideToggle", booleanAttribute],
      togglePosition: "togglePosition"
    },
    outputs: {
      afterExpand: "afterExpand",
      afterCollapse: "afterCollapse"
    },
    exportAs: ["matExpansionPanel"],
    features: [\u0275\u0275ProvidersFeature([
      // Provide MatAccordion as undefined to prevent nested expansion panels from registering
      // to the same accordion.
      {
        provide: MAT_ACCORDION,
        useValue: void 0
      },
      {
        provide: MAT_EXPANSION_PANEL,
        useExisting: _MatExpansionPanel
      }
    ]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275NgOnChangesFeature],
    ngContentSelectors: _c3,
    decls: 9,
    vars: 4,
    consts: [["bodyWrapper", ""], ["body", ""], [1, "mat-expansion-panel-content-wrapper"], ["role", "region", 1, "mat-expansion-panel-content", 3, "id"], [1, "mat-expansion-panel-body"], [3, "cdkPortalOutlet"]],
    template: function MatExpansionPanel_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c2);
        \u0275\u0275projection(0);
        \u0275\u0275elementStart(1, "div", 2, 0)(3, "div", 3, 1)(5, "div", 4);
        \u0275\u0275projection(6, 1);
        \u0275\u0275template(7, MatExpansionPanel_ng_template_7_Template, 0, 0, "ng-template", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275projection(8, 2);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275attribute("inert", ctx.expanded ? null : "");
        \u0275\u0275advance(2);
        \u0275\u0275property("id", ctx.id);
        \u0275\u0275attribute("aria-labelledby", ctx._headerId);
        \u0275\u0275advance(4);
        \u0275\u0275property("cdkPortalOutlet", ctx._portal);
      }
    },
    dependencies: [CdkPortalOutlet],
    styles: [".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;overflow:hidden;position:relative;background:var(--mat-expansion-container-background-color, var(--mat-sys-surface));color:var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));border-radius:var(--mat-expansion-container-shape, 12px)}.mat-expansion-panel.mat-expansion-panel-animations-enabled{transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape, 12px);border-top-left-radius:var(--mat-expansion-container-shape, 12px)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape, 12px);border-bottom-left-radius:var(--mat-expansion-container-shape, 12px)}@media(forced-colors: active){.mat-expansion-panel{outline:solid 1px}}.mat-expansion-panel-content-wrapper{display:grid;grid-template-rows:0fr;grid-template-columns:100%}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper{transition:grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{grid-template-rows:1fr}@supports not (grid-template-rows: 0fr){.mat-expansion-panel-content-wrapper{height:0}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{height:auto}}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;min-height:0;visibility:hidden;font-family:var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));line-height:var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));letter-spacing:var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content{transition:visibility 190ms linear}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper>.mat-expansion-panel-content{visibility:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color, var(--mat-sys-outline))}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanel, [{
    type: Component,
    args: [{
      selector: "mat-expansion-panel",
      exportAs: "matExpansionPanel",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [
        // Provide MatAccordion as undefined to prevent nested expansion panels from registering
        // to the same accordion.
        {
          provide: MAT_ACCORDION,
          useValue: void 0
        },
        {
          provide: MAT_EXPANSION_PANEL,
          useExisting: MatExpansionPanel
        }
      ],
      host: {
        "class": "mat-expansion-panel",
        "[class.mat-expanded]": "expanded",
        "[class.mat-expansion-panel-spacing]": "_hasSpacing()"
      },
      imports: [CdkPortalOutlet],
      template: `<ng-content select="mat-expansion-panel-header"></ng-content>
<div class="mat-expansion-panel-content-wrapper" [attr.inert]="expanded ? null : ''" #bodyWrapper>
  <div class="mat-expansion-panel-content"
       role="region"
       [attr.aria-labelledby]="_headerId"
       [id]="id"
       #body>
    <div class="mat-expansion-panel-body">
      <ng-content></ng-content>
      <ng-template [cdkPortalOutlet]="_portal"></ng-template>
    </div>
    <ng-content select="mat-action-row"></ng-content>
  </div>
</div>
`,
      styles: [".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;overflow:hidden;position:relative;background:var(--mat-expansion-container-background-color, var(--mat-sys-surface));color:var(--mat-expansion-container-text-color, var(--mat-sys-on-surface));border-radius:var(--mat-expansion-container-shape, 12px)}.mat-expansion-panel.mat-expansion-panel-animations-enabled{transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:var(--mat-expansion-container-shape, 12px);border-top-left-radius:var(--mat-expansion-container-shape, 12px)}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:var(--mat-expansion-container-shape, 12px);border-bottom-left-radius:var(--mat-expansion-container-shape, 12px)}@media(forced-colors: active){.mat-expansion-panel{outline:solid 1px}}.mat-expansion-panel-content-wrapper{display:grid;grid-template-rows:0fr;grid-template-columns:100%}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content-wrapper{transition:grid-template-rows 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{grid-template-rows:1fr}@supports not (grid-template-rows: 0fr){.mat-expansion-panel-content-wrapper{height:0}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper{height:auto}}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible;min-height:0;visibility:hidden;font-family:var(--mat-expansion-container-text-font, var(--mat-sys-body-large-font));font-size:var(--mat-expansion-container-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-expansion-container-text-weight, var(--mat-sys-body-large-weight));line-height:var(--mat-expansion-container-text-line-height, var(--mat-sys-body-large-line-height));letter-spacing:var(--mat-expansion-container-text-tracking, var(--mat-sys-body-large-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-content{transition:visibility 190ms linear}.mat-expansion-panel.mat-expanded>.mat-expansion-panel-content-wrapper>.mat-expansion-panel-content{visibility:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px;border-top-color:var(--mat-expansion-actions-divider-color, var(--mat-sys-outline))}.mat-action-row .mat-button-base,.mat-action-row .mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row .mat-button-base,[dir=rtl] .mat-action-row .mat-mdc-button-base{margin-left:0;margin-right:8px}\n"]
    }]
  }], () => [], {
    hideToggle: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    togglePosition: [{
      type: Input
    }],
    afterExpand: [{
      type: Output
    }],
    afterCollapse: [{
      type: Output
    }],
    _lazyContent: [{
      type: ContentChild,
      args: [MatExpansionPanelContent]
    }],
    _body: [{
      type: ViewChild,
      args: ["body"]
    }],
    _bodyWrapper: [{
      type: ViewChild,
      args: ["bodyWrapper"]
    }]
  });
})();
var MatExpansionPanelActionRow = class _MatExpansionPanelActionRow {
  static \u0275fac = function MatExpansionPanelActionRow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelActionRow)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatExpansionPanelActionRow,
    selectors: [["mat-action-row"]],
    hostAttrs: [1, "mat-action-row"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelActionRow, [{
    type: Directive,
    args: [{
      selector: "mat-action-row",
      host: {
        class: "mat-action-row"
      }
    }]
  }], null, null);
})();
var MatExpansionPanelHeader = class _MatExpansionPanelHeader {
  panel = inject(MatExpansionPanel, {
    host: true
  });
  _element = inject(ElementRef);
  _focusMonitor = inject(FocusMonitor);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _parentChangeSubscription = Subscription.EMPTY;
  constructor() {
    inject(_CdkPrivateStyleLoader).load(_StructuralStylesLoader);
    const panel = this.panel;
    const defaultOptions = inject(MAT_EXPANSION_PANEL_DEFAULT_OPTIONS, {
      optional: true
    });
    const tabIndex = inject(new HostAttributeToken("tabindex"), {
      optional: true
    });
    const accordionHideToggleChange = panel.accordion ? panel.accordion._stateChanges.pipe(filter((changes) => !!(changes["hideToggle"] || changes["togglePosition"]))) : EMPTY;
    this.tabIndex = parseInt(tabIndex || "") || 0;
    this._parentChangeSubscription = merge(panel.opened, panel.closed, accordionHideToggleChange, panel._inputChanges.pipe(filter((changes) => {
      return !!(changes["hideToggle"] || changes["disabled"] || changes["togglePosition"]);
    }))).subscribe(() => this._changeDetectorRef.markForCheck());
    panel.closed.pipe(filter(() => panel._containsFocus())).subscribe(() => this._focusMonitor.focusVia(this._element, "program"));
    if (defaultOptions) {
      this.expandedHeight = defaultOptions.expandedHeight;
      this.collapsedHeight = defaultOptions.collapsedHeight;
    }
  }
  /** Height of the header while the panel is expanded. */
  expandedHeight;
  /** Height of the header while the panel is collapsed. */
  collapsedHeight;
  /** Tab index of the header. */
  tabIndex = 0;
  /**
   * Whether the associated panel is disabled. Implemented as a part of `FocusableOption`.
   * @docs-private
   */
  get disabled() {
    return this.panel.disabled;
  }
  /** Toggles the expanded state of the panel. */
  _toggle() {
    if (!this.disabled) {
      this.panel.toggle();
    }
  }
  /** Gets whether the panel is expanded. */
  _isExpanded() {
    return this.panel.expanded;
  }
  /** Gets the expanded state string of the panel. */
  _getExpandedState() {
    return this.panel._getExpandedState();
  }
  /** Gets the panel id. */
  _getPanelId() {
    return this.panel.id;
  }
  /** Gets the toggle position for the header. */
  _getTogglePosition() {
    return this.panel.togglePosition;
  }
  /** Gets whether the expand indicator should be shown. */
  _showToggle() {
    return !this.panel.hideToggle && !this.panel.disabled;
  }
  /**
   * Gets the current height of the header. Null if no custom height has been
   * specified, and if the default height from the stylesheet should be used.
   */
  _getHeaderHeight() {
    const isExpanded = this._isExpanded();
    if (isExpanded && this.expandedHeight) {
      return this.expandedHeight;
    } else if (!isExpanded && this.collapsedHeight) {
      return this.collapsedHeight;
    }
    return null;
  }
  /** Handle keydown event calling to toggle() if appropriate. */
  _keydown(event) {
    switch (event.keyCode) {
      // Toggle for space and enter keys.
      case SPACE:
      case ENTER:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this._toggle();
        }
        break;
      default:
        if (this.panel.accordion) {
          this.panel.accordion._handleHeaderKeydown(event);
        }
        return;
    }
  }
  /**
   * Focuses the panel header. Implemented as a part of `FocusableOption`.
   * @param origin Origin of the action that triggered the focus.
   * @docs-private
   */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._element, origin, options);
    } else {
      this._element.nativeElement.focus(options);
    }
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._element).subscribe((origin) => {
      if (origin && this.panel.accordion) {
        this.panel.accordion._handleHeaderFocus(this);
      }
    });
  }
  ngOnDestroy() {
    this._parentChangeSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._element);
  }
  static \u0275fac = function MatExpansionPanelHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelHeader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatExpansionPanelHeader,
    selectors: [["mat-expansion-panel-header"]],
    hostAttrs: ["role", "button", 1, "mat-expansion-panel-header", "mat-focus-indicator"],
    hostVars: 13,
    hostBindings: function MatExpansionPanelHeader_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("click", function MatExpansionPanelHeader_click_HostBindingHandler() {
          return ctx._toggle();
        })("keydown", function MatExpansionPanelHeader_keydown_HostBindingHandler($event) {
          return ctx._keydown($event);
        });
      }
      if (rf & 2) {
        \u0275\u0275attribute("id", ctx.panel._headerId)("tabindex", ctx.disabled ? -1 : ctx.tabIndex)("aria-controls", ctx._getPanelId())("aria-expanded", ctx._isExpanded())("aria-disabled", ctx.panel.disabled);
        \u0275\u0275styleProp("height", ctx._getHeaderHeight());
        \u0275\u0275classProp("mat-expanded", ctx._isExpanded())("mat-expansion-toggle-indicator-after", ctx._getTogglePosition() === "after")("mat-expansion-toggle-indicator-before", ctx._getTogglePosition() === "before");
      }
    },
    inputs: {
      expandedHeight: "expandedHeight",
      collapsedHeight: "collapsedHeight",
      tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)]
    },
    ngContentSelectors: _c5,
    decls: 5,
    vars: 3,
    consts: [[1, "mat-content"], [1, "mat-expansion-indicator"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 -960 960 960", "aria-hidden", "true", "focusable", "false"], ["d", "M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"]],
    template: function MatExpansionPanelHeader_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef(_c4);
        \u0275\u0275elementStart(0, "span", 0);
        \u0275\u0275projection(1);
        \u0275\u0275projection(2, 1);
        \u0275\u0275projection(3, 2);
        \u0275\u0275elementEnd();
        \u0275\u0275template(4, MatExpansionPanelHeader_Conditional_4_Template, 3, 0, "span", 1);
      }
      if (rf & 2) {
        \u0275\u0275classProp("mat-content-hide-toggle", !ctx._showToggle());
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx._showToggle() ? 4 : -1);
      }
    },
    styles: ['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;height:var(--mat-expansion-header-collapsed-state-height, 48px);font-family:var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));font-size:var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));font-weight:var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));line-height:var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));letter-spacing:var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-header{transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header::before{border-radius:inherit}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height, 64px)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color, var(--mat-sys-surface))}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color, var(--mat-sys-on-surface))}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant))}.mat-expansion-panel-animations-enabled .mat-expansion-indicator{transition:transform 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator{transform:rotate(180deg)}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-legacy-header-indicator-display, none)}.mat-expansion-indicator svg{width:24px;height:24px;margin:0 -8px;vertical-align:middle;fill:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-header-indicator-display, inline-block)}@media(forced-colors: active){.mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelHeader, [{
    type: Component,
    args: [{
      selector: "mat-expansion-panel-header",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mat-expansion-panel-header mat-focus-indicator",
        "role": "button",
        "[attr.id]": "panel._headerId",
        "[attr.tabindex]": "disabled ? -1 : tabIndex",
        "[attr.aria-controls]": "_getPanelId()",
        "[attr.aria-expanded]": "_isExpanded()",
        "[attr.aria-disabled]": "panel.disabled",
        "[class.mat-expanded]": "_isExpanded()",
        "[class.mat-expansion-toggle-indicator-after]": `_getTogglePosition() === 'after'`,
        "[class.mat-expansion-toggle-indicator-before]": `_getTogglePosition() === 'before'`,
        "[style.height]": "_getHeaderHeight()",
        "(click)": "_toggle()",
        "(keydown)": "_keydown($event)"
      },
      template: '<span class="mat-content" [class.mat-content-hide-toggle]="!_showToggle()">\n  <ng-content select="mat-panel-title"></ng-content>\n  <ng-content select="mat-panel-description"></ng-content>\n  <ng-content></ng-content>\n</span>\n\n@if (_showToggle()) {\n  <span class="mat-expansion-indicator">\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      viewBox="0 -960 960 960"\n      aria-hidden="true"\n      focusable="false">\n      <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>\n    </svg>\n  </span>\n}\n',
      styles: ['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;height:var(--mat-expansion-header-collapsed-state-height, 48px);font-family:var(--mat-expansion-header-text-font, var(--mat-sys-title-medium-font));font-size:var(--mat-expansion-header-text-size, var(--mat-sys-title-medium-size));font-weight:var(--mat-expansion-header-text-weight, var(--mat-sys-title-medium-weight));line-height:var(--mat-expansion-header-text-line-height, var(--mat-sys-title-medium-line-height));letter-spacing:var(--mat-expansion-header-text-tracking, var(--mat-sys-title-medium-tracking))}.mat-expansion-panel-animations-enabled .mat-expansion-panel-header{transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header::before{border-radius:inherit}.mat-expansion-panel-header.mat-expanded{height:var(--mat-expansion-header-expanded-state-height, 64px)}.mat-expansion-panel-header[aria-disabled=true]{color:var(--mat-expansion-header-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}@media(hover: none){.mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:not([aria-disabled=true]):hover{background:var(--mat-expansion-container-background-color, var(--mat-sys-surface))}}.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-keyboard-focused,.mat-expansion-panel .mat-expansion-panel-header:not([aria-disabled=true]).cdk-program-focused{background:var(--mat-expansion-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-content.mat-content-hide-toggle{margin-right:8px}[dir=rtl] .mat-content.mat-content-hide-toggle{margin-right:0;margin-left:8px}.mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-left:24px;margin-right:0}[dir=rtl] .mat-expansion-toggle-indicator-before .mat-content.mat-content-hide-toggle{margin-right:24px;margin-left:0}.mat-expansion-panel-header-title{color:var(--mat-expansion-header-text-color, var(--mat-sys-on-surface))}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;flex-basis:0;margin-right:16px;align-items:center}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-title,.mat-expansion-panel-header[aria-disabled=true] .mat-expansion-panel-header-description{color:inherit}.mat-expansion-panel-header-description{flex-grow:2;color:var(--mat-expansion-header-description-color, var(--mat-sys-on-surface-variant))}.mat-expansion-panel-animations-enabled .mat-expansion-indicator{transition:transform 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header.mat-expanded .mat-expansion-indicator{transform:rotate(180deg)}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle;color:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-legacy-header-indicator-display, none)}.mat-expansion-indicator svg{width:24px;height:24px;margin:0 -8px;vertical-align:middle;fill:var(--mat-expansion-header-indicator-color, var(--mat-sys-on-surface-variant));display:var(--mat-expansion-header-indicator-display, inline-block)}@media(forced-colors: active){.mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}}\n']
    }]
  }], () => [], {
    expandedHeight: [{
      type: Input
    }],
    collapsedHeight: [{
      type: Input
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }]
  });
})();
var MatExpansionPanelDescription = class _MatExpansionPanelDescription {
  static \u0275fac = function MatExpansionPanelDescription_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelDescription)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatExpansionPanelDescription,
    selectors: [["mat-panel-description"]],
    hostAttrs: [1, "mat-expansion-panel-header-description"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelDescription, [{
    type: Directive,
    args: [{
      selector: "mat-panel-description",
      host: {
        class: "mat-expansion-panel-header-description"
      }
    }]
  }], null, null);
})();
var MatExpansionPanelTitle = class _MatExpansionPanelTitle {
  static \u0275fac = function MatExpansionPanelTitle_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionPanelTitle)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatExpansionPanelTitle,
    selectors: [["mat-panel-title"]],
    hostAttrs: [1, "mat-expansion-panel-header-title"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionPanelTitle, [{
    type: Directive,
    args: [{
      selector: "mat-panel-title",
      host: {
        class: "mat-expansion-panel-header-title"
      }
    }]
  }], null, null);
})();
var MatAccordion = class _MatAccordion extends CdkAccordion {
  _keyManager;
  /** Headers belonging to this accordion. */
  _ownHeaders = new QueryList();
  /** All headers inside the accordion. Includes headers inside nested accordions. */
  _headers;
  /** Whether the expansion indicator should be hidden. */
  hideToggle = false;
  /**
   * Display mode used for all expansion panels in the accordion. Currently two display
   * modes exist:
   *  default - a gutter-like spacing is placed around any expanded panel, placing the expanded
   *     panel at a different elevation from the rest of the accordion.
   *  flat - no spacing is placed around expanded panels, showing all panels at the same
   *     elevation.
   */
  displayMode = "default";
  /** The position of the expansion indicator. */
  togglePosition = "after";
  ngAfterContentInit() {
    this._headers.changes.pipe(startWith(this._headers)).subscribe((headers) => {
      this._ownHeaders.reset(headers.filter((header) => header.panel.accordion === this));
      this._ownHeaders.notifyOnChanges();
    });
    this._keyManager = new FocusKeyManager(this._ownHeaders).withWrap().withHomeAndEnd();
  }
  /** Handles keyboard events coming in from the panel headers. */
  _handleHeaderKeydown(event) {
    this._keyManager.onKeydown(event);
  }
  _handleHeaderFocus(header) {
    this._keyManager.updateActiveItem(header);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this._keyManager?.destroy();
    this._ownHeaders.destroy();
  }
  static \u0275fac = /* @__PURE__ */ (() => {
    let \u0275MatAccordion_BaseFactory;
    return function MatAccordion_Factory(__ngFactoryType__) {
      return (\u0275MatAccordion_BaseFactory || (\u0275MatAccordion_BaseFactory = \u0275\u0275getInheritedFactory(_MatAccordion)))(__ngFactoryType__ || _MatAccordion);
    };
  })();
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatAccordion,
    selectors: [["mat-accordion"]],
    contentQueries: function MatAccordion_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuery(dirIndex, MatExpansionPanelHeader, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._headers = _t);
      }
    },
    hostAttrs: [1, "mat-accordion"],
    hostVars: 2,
    hostBindings: function MatAccordion_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-accordion-multi", ctx.multi);
      }
    },
    inputs: {
      hideToggle: [2, "hideToggle", "hideToggle", booleanAttribute],
      displayMode: "displayMode",
      togglePosition: "togglePosition"
    },
    exportAs: ["matAccordion"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_ACCORDION,
      useExisting: _MatAccordion
    }]), \u0275\u0275InheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatAccordion, [{
    type: Directive,
    args: [{
      selector: "mat-accordion",
      exportAs: "matAccordion",
      providers: [{
        provide: MAT_ACCORDION,
        useExisting: MatAccordion
      }],
      host: {
        class: "mat-accordion",
        // Class binding which is only used by the test harness as there is no other
        // way for the harness to detect if multiple panel support is enabled.
        "[class.mat-accordion-multi]": "this.multi"
      }
    }]
  }], null, {
    _headers: [{
      type: ContentChildren,
      args: [MatExpansionPanelHeader, {
        descendants: true
      }]
    }],
    hideToggle: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    displayMode: [{
      type: Input
    }],
    togglePosition: [{
      type: Input
    }]
  });
})();
var MatExpansionModule = class _MatExpansionModule {
  static \u0275fac = function MatExpansionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatExpansionModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatExpansionModule,
    imports: [MatCommonModule, CdkAccordionModule, PortalModule, MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent],
    exports: [MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, CdkAccordionModule, PortalModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatExpansionModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CdkAccordionModule, PortalModule, MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent],
      exports: [MatAccordion, MatExpansionPanel, MatExpansionPanelActionRow, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatExpansionPanelContent]
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19.2.14_rxjs@7.8.2_zone.js@0_acf0b48f9f6c20839ed0337e05a1c5b6/node_modules/@angular/cdk/fesm2022/observers/private.mjs
var loopLimitExceededErrorHandler = (e) => {
  if (e instanceof ErrorEvent && e.message === "ResizeObserver loop limit exceeded") {
    console.error(`${e.message}. This could indicate a performance issue with your app. See https://github.com/WICG/resize-observer/blob/master/explainer.md#error-handling`);
  }
};
var SingleBoxSharedResizeObserver = class {
  _box;
  /** Stream that emits when the shared observer is destroyed. */
  _destroyed = new Subject();
  /** Stream of all events from the ResizeObserver. */
  _resizeSubject = new Subject();
  /** ResizeObserver used to observe element resize events. */
  _resizeObserver;
  /** A map of elements to streams of their resize events. */
  _elementObservables = /* @__PURE__ */ new Map();
  constructor(_box) {
    this._box = _box;
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver((entries) => this._resizeSubject.next(entries));
    }
  }
  /**
   * Gets a stream of resize events for the given element.
   * @param target The element to observe.
   * @return The stream of resize events for the element.
   */
  observe(target) {
    if (!this._elementObservables.has(target)) {
      this._elementObservables.set(target, new Observable((observer) => {
        const subscription = this._resizeSubject.subscribe(observer);
        this._resizeObserver?.observe(target, {
          box: this._box
        });
        return () => {
          this._resizeObserver?.unobserve(target);
          subscription.unsubscribe();
          this._elementObservables.delete(target);
        };
      }).pipe(
        filter((entries) => entries.some((entry) => entry.target === target)),
        // Share a replay of the last event so that subsequent calls to observe the same element
        // receive initial sizing info like the first one. Also enable ref counting so the
        // element will be automatically unobserved when there are no more subscriptions.
        shareReplay({
          bufferSize: 1,
          refCount: true
        }),
        takeUntil(this._destroyed)
      ));
    }
    return this._elementObservables.get(target);
  }
  /** Destroys this instance. */
  destroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._resizeSubject.complete();
    this._elementObservables.clear();
  }
};
var SharedResizeObserver = class _SharedResizeObserver {
  _cleanupErrorListener;
  /** Map of box type to shared resize observer. */
  _observers = /* @__PURE__ */ new Map();
  /** The Angular zone. */
  _ngZone = inject(NgZone);
  constructor() {
    if (typeof ResizeObserver !== "undefined" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      this._ngZone.runOutsideAngular(() => {
        const renderer = inject(RendererFactory2).createRenderer(null, null);
        this._cleanupErrorListener = renderer.listen("window", "error", loopLimitExceededErrorHandler);
      });
    }
  }
  ngOnDestroy() {
    for (const [, observer] of this._observers) {
      observer.destroy();
    }
    this._observers.clear();
    this._cleanupErrorListener?.();
  }
  /**
   * Gets a stream of resize events for the given target element and box type.
   * @param target The element to observe for resizes.
   * @param options Options to pass to the `ResizeObserver`
   * @return The stream of resize events for the element.
   */
  observe(target, options) {
    const box = options?.box || "content-box";
    if (!this._observers.has(box)) {
      this._observers.set(box, new SingleBoxSharedResizeObserver(box));
    }
    return this._observers.get(box).observe(target);
  }
  static \u0275fac = function SharedResizeObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedResizeObserver)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _SharedResizeObserver,
    factory: _SharedResizeObserver.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedResizeObserver, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/form-field-DqPi4knt.mjs
var _c02 = ["notch"];
var _c12 = ["matFormFieldNotchedOutline", ""];
var _c22 = ["*"];
var _c32 = ["textField"];
var _c42 = ["iconPrefixContainer"];
var _c52 = ["textPrefixContainer"];
var _c6 = ["iconSuffixContainer"];
var _c7 = ["textSuffixContainer"];
var _c8 = ["*", [["mat-label"]], [["", "matPrefix", ""], ["", "matIconPrefix", ""]], [["", "matTextPrefix", ""]], [["", "matTextSuffix", ""]], [["", "matSuffix", ""], ["", "matIconSuffix", ""]], [["mat-error"], ["", "matError", ""]], [["mat-hint", 3, "align", "end"]], [["mat-hint", "align", "end"]]];
var _c9 = ["*", "mat-label", "[matPrefix], [matIconPrefix]", "[matTextPrefix]", "[matTextSuffix]", "[matSuffix], [matIconSuffix]", "mat-error, [matError]", "mat-hint:not([align='end'])", "mat-hint[align='end']"];
function MatFormField_ng_template_0_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 20);
  }
}
function MatFormField_ng_template_0_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "label", 19);
    \u0275\u0275projection(1, 1);
    \u0275\u0275template(2, MatFormField_ng_template_0_Conditional_0_Conditional_2_Template, 1, 0, "span", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("floating", ctx_r1._shouldLabelFloat())("monitorResize", ctx_r1._hasOutline())("id", ctx_r1._labelId);
    \u0275\u0275attribute("for", ctx_r1._control.disableAutomaticLabeling ? null : ctx_r1._control.id);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r1.hideRequiredMarker && ctx_r1._control.required ? 2 : -1);
  }
}
function MatFormField_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatFormField_ng_template_0_Conditional_0_Template, 3, 5, "label", 19);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1._hasFloatingLabel() ? 0 : -1);
  }
}
function MatFormField_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 7);
  }
}
function MatFormField_Conditional_6_Conditional_1_ng_template_0_Template(rf, ctx) {
}
function MatFormField_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatFormField_Conditional_6_Conditional_1_ng_template_0_Template, 0, 0, "ng-template", 13);
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const labelTemplate_r3 = \u0275\u0275reference(1);
    \u0275\u0275property("ngTemplateOutlet", labelTemplate_r3);
  }
}
function MatFormField_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, MatFormField_Conditional_6_Conditional_1_Template, 1, 1, null, 13);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("matFormFieldNotchedOutlineOpen", ctx_r1._shouldLabelFloat());
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1._forceDisplayInfixLabel() ? 1 : -1);
  }
}
function MatFormField_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10, 2);
    \u0275\u0275projection(2, 2);
    \u0275\u0275elementEnd();
  }
}
function MatFormField_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11, 3);
    \u0275\u0275projection(2, 3);
    \u0275\u0275elementEnd();
  }
}
function MatFormField_Conditional_10_ng_template_0_Template(rf, ctx) {
}
function MatFormField_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatFormField_Conditional_10_ng_template_0_Template, 0, 0, "ng-template", 13);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const labelTemplate_r3 = \u0275\u0275reference(1);
    \u0275\u0275property("ngTemplateOutlet", labelTemplate_r3);
  }
}
function MatFormField_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14, 4);
    \u0275\u0275projection(2, 4);
    \u0275\u0275elementEnd();
  }
}
function MatFormField_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15, 5);
    \u0275\u0275projection(2, 5);
    \u0275\u0275elementEnd();
  }
}
function MatFormField_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 16);
  }
}
function MatFormField_Case_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0, 6);
  }
}
function MatFormField_Case_19_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-hint", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("id", ctx_r1._hintLabelId);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.hintLabel);
  }
}
function MatFormField_Case_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatFormField_Case_19_Conditional_0_Template, 2, 2, "mat-hint", 21);
    \u0275\u0275projection(1, 7);
    \u0275\u0275element(2, "div", 22);
    \u0275\u0275projection(3, 8);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.hintLabel ? 0 : -1);
  }
}
var MatLabel = class _MatLabel {
  static \u0275fac = function MatLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatLabel)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatLabel,
    selectors: [["mat-label"]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatLabel, [{
    type: Directive,
    args: [{
      selector: "mat-label"
    }]
  }], null, null);
})();
var MAT_ERROR = new InjectionToken("MatError");
var MatError = class _MatError {
  id = inject(_IdGenerator).getId("mat-mdc-error-");
  constructor() {
  }
  static \u0275fac = function MatError_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatError)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatError,
    selectors: [["mat-error"], ["", "matError", ""]],
    hostAttrs: [1, "mat-mdc-form-field-error", "mat-mdc-form-field-bottom-align"],
    hostVars: 1,
    hostBindings: function MatError_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275hostProperty("id", ctx.id);
      }
    },
    inputs: {
      id: "id"
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_ERROR,
      useExisting: _MatError
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatError, [{
    type: Directive,
    args: [{
      selector: "mat-error, [matError]",
      host: {
        "class": "mat-mdc-form-field-error mat-mdc-form-field-bottom-align",
        "[id]": "id"
      },
      providers: [{
        provide: MAT_ERROR,
        useExisting: MatError
      }]
    }]
  }], () => [], {
    id: [{
      type: Input
    }]
  });
})();
var MatHint = class _MatHint {
  /** Whether to align the hint label at the start or end of the line. */
  align = "start";
  /** Unique ID for the hint. Used for the aria-describedby on the form field control. */
  id = inject(_IdGenerator).getId("mat-mdc-hint-");
  static \u0275fac = function MatHint_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatHint)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatHint,
    selectors: [["mat-hint"]],
    hostAttrs: [1, "mat-mdc-form-field-hint", "mat-mdc-form-field-bottom-align"],
    hostVars: 4,
    hostBindings: function MatHint_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275hostProperty("id", ctx.id);
        \u0275\u0275attribute("align", null);
        \u0275\u0275classProp("mat-mdc-form-field-hint-end", ctx.align === "end");
      }
    },
    inputs: {
      align: "align",
      id: "id"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatHint, [{
    type: Directive,
    args: [{
      selector: "mat-hint",
      host: {
        "class": "mat-mdc-form-field-hint mat-mdc-form-field-bottom-align",
        "[class.mat-mdc-form-field-hint-end]": 'align === "end"',
        "[id]": "id",
        // Remove align attribute to prevent it from interfering with layout.
        "[attr.align]": "null"
      }
    }]
  }], null, {
    align: [{
      type: Input
    }],
    id: [{
      type: Input
    }]
  });
})();
var MAT_PREFIX = new InjectionToken("MatPrefix");
var MatPrefix = class _MatPrefix {
  set _isTextSelector(value) {
    this._isText = true;
  }
  _isText = false;
  static \u0275fac = function MatPrefix_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatPrefix)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatPrefix,
    selectors: [["", "matPrefix", ""], ["", "matIconPrefix", ""], ["", "matTextPrefix", ""]],
    inputs: {
      _isTextSelector: [0, "matTextPrefix", "_isTextSelector"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_PREFIX,
      useExisting: _MatPrefix
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatPrefix, [{
    type: Directive,
    args: [{
      selector: "[matPrefix], [matIconPrefix], [matTextPrefix]",
      providers: [{
        provide: MAT_PREFIX,
        useExisting: MatPrefix
      }]
    }]
  }], null, {
    _isTextSelector: [{
      type: Input,
      args: ["matTextPrefix"]
    }]
  });
})();
var MAT_SUFFIX = new InjectionToken("MatSuffix");
var MatSuffix = class _MatSuffix {
  set _isTextSelector(value) {
    this._isText = true;
  }
  _isText = false;
  static \u0275fac = function MatSuffix_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSuffix)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatSuffix,
    selectors: [["", "matSuffix", ""], ["", "matIconSuffix", ""], ["", "matTextSuffix", ""]],
    inputs: {
      _isTextSelector: [0, "matTextSuffix", "_isTextSelector"]
    },
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_SUFFIX,
      useExisting: _MatSuffix
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSuffix, [{
    type: Directive,
    args: [{
      selector: "[matSuffix], [matIconSuffix], [matTextSuffix]",
      providers: [{
        provide: MAT_SUFFIX,
        useExisting: MatSuffix
      }]
    }]
  }], null, {
    _isTextSelector: [{
      type: Input,
      args: ["matTextSuffix"]
    }]
  });
})();
var FLOATING_LABEL_PARENT = new InjectionToken("FloatingLabelParent");
var MatFormFieldFloatingLabel = class _MatFormFieldFloatingLabel {
  _elementRef = inject(ElementRef);
  /** Whether the label is floating. */
  get floating() {
    return this._floating;
  }
  set floating(value) {
    this._floating = value;
    if (this.monitorResize) {
      this._handleResize();
    }
  }
  _floating = false;
  /** Whether to monitor for resize events on the floating label. */
  get monitorResize() {
    return this._monitorResize;
  }
  set monitorResize(value) {
    this._monitorResize = value;
    if (this._monitorResize) {
      this._subscribeToResize();
    } else {
      this._resizeSubscription.unsubscribe();
    }
  }
  _monitorResize = false;
  /** The shared ResizeObserver. */
  _resizeObserver = inject(SharedResizeObserver);
  /** The Angular zone. */
  _ngZone = inject(NgZone);
  /** The parent form-field. */
  _parent = inject(FLOATING_LABEL_PARENT);
  /** The current resize event subscription. */
  _resizeSubscription = new Subscription();
  constructor() {
  }
  ngOnDestroy() {
    this._resizeSubscription.unsubscribe();
  }
  /** Gets the width of the label. Used for the outline notch. */
  getWidth() {
    return estimateScrollWidth(this._elementRef.nativeElement);
  }
  /** Gets the HTML element for the floating label. */
  get element() {
    return this._elementRef.nativeElement;
  }
  /** Handles resize events from the ResizeObserver. */
  _handleResize() {
    setTimeout(() => this._parent._handleLabelResized());
  }
  /** Subscribes to resize events. */
  _subscribeToResize() {
    this._resizeSubscription.unsubscribe();
    this._ngZone.runOutsideAngular(() => {
      this._resizeSubscription = this._resizeObserver.observe(this._elementRef.nativeElement, {
        box: "border-box"
      }).subscribe(() => this._handleResize());
    });
  }
  static \u0275fac = function MatFormFieldFloatingLabel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldFloatingLabel)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatFormFieldFloatingLabel,
    selectors: [["label", "matFormFieldFloatingLabel", ""]],
    hostAttrs: [1, "mdc-floating-label", "mat-mdc-floating-label"],
    hostVars: 2,
    hostBindings: function MatFormFieldFloatingLabel_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mdc-floating-label--float-above", ctx.floating);
      }
    },
    inputs: {
      floating: "floating",
      monitorResize: "monitorResize"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldFloatingLabel, [{
    type: Directive,
    args: [{
      selector: "label[matFormFieldFloatingLabel]",
      host: {
        "class": "mdc-floating-label mat-mdc-floating-label",
        "[class.mdc-floating-label--float-above]": "floating"
      }
    }]
  }], () => [], {
    floating: [{
      type: Input
    }],
    monitorResize: [{
      type: Input
    }]
  });
})();
function estimateScrollWidth(element) {
  const htmlEl = element;
  if (htmlEl.offsetParent !== null) {
    return htmlEl.scrollWidth;
  }
  const clone = htmlEl.cloneNode(true);
  clone.style.setProperty("position", "absolute");
  clone.style.setProperty("transform", "translate(-9999px, -9999px)");
  document.documentElement.appendChild(clone);
  const scrollWidth = clone.scrollWidth;
  clone.remove();
  return scrollWidth;
}
var ACTIVATE_CLASS = "mdc-line-ripple--active";
var DEACTIVATING_CLASS = "mdc-line-ripple--deactivating";
var MatFormFieldLineRipple = class _MatFormFieldLineRipple {
  _elementRef = inject(ElementRef);
  _cleanupTransitionEnd;
  constructor() {
    const ngZone = inject(NgZone);
    const renderer = inject(Renderer2);
    ngZone.runOutsideAngular(() => {
      this._cleanupTransitionEnd = renderer.listen(this._elementRef.nativeElement, "transitionend", this._handleTransitionEnd);
    });
  }
  activate() {
    const classList = this._elementRef.nativeElement.classList;
    classList.remove(DEACTIVATING_CLASS);
    classList.add(ACTIVATE_CLASS);
  }
  deactivate() {
    this._elementRef.nativeElement.classList.add(DEACTIVATING_CLASS);
  }
  _handleTransitionEnd = (event) => {
    const classList = this._elementRef.nativeElement.classList;
    const isDeactivating = classList.contains(DEACTIVATING_CLASS);
    if (event.propertyName === "opacity" && isDeactivating) {
      classList.remove(ACTIVATE_CLASS, DEACTIVATING_CLASS);
    }
  };
  ngOnDestroy() {
    this._cleanupTransitionEnd();
  }
  static \u0275fac = function MatFormFieldLineRipple_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldLineRipple)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatFormFieldLineRipple,
    selectors: [["div", "matFormFieldLineRipple", ""]],
    hostAttrs: [1, "mdc-line-ripple"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldLineRipple, [{
    type: Directive,
    args: [{
      selector: "div[matFormFieldLineRipple]",
      host: {
        "class": "mdc-line-ripple"
      }
    }]
  }], () => [], null);
})();
var MatFormFieldNotchedOutline = class _MatFormFieldNotchedOutline {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  /** Whether the notch should be opened. */
  open = false;
  _notch;
  constructor() {
  }
  ngAfterViewInit() {
    const label = this._elementRef.nativeElement.querySelector(".mdc-floating-label");
    if (label) {
      this._elementRef.nativeElement.classList.add("mdc-notched-outline--upgraded");
      if (typeof requestAnimationFrame === "function") {
        label.style.transitionDuration = "0s";
        this._ngZone.runOutsideAngular(() => {
          requestAnimationFrame(() => label.style.transitionDuration = "");
        });
      }
    } else {
      this._elementRef.nativeElement.classList.add("mdc-notched-outline--no-label");
    }
  }
  _setNotchWidth(labelWidth) {
    if (!this.open || !labelWidth) {
      this._notch.nativeElement.style.width = "";
    } else {
      const NOTCH_ELEMENT_PADDING = 8;
      const NOTCH_ELEMENT_BORDER = 1;
      this._notch.nativeElement.style.width = `calc(${labelWidth}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${NOTCH_ELEMENT_PADDING + NOTCH_ELEMENT_BORDER}px)`;
    }
  }
  static \u0275fac = function MatFormFieldNotchedOutline_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldNotchedOutline)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatFormFieldNotchedOutline,
    selectors: [["div", "matFormFieldNotchedOutline", ""]],
    viewQuery: function MatFormFieldNotchedOutline_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c02, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._notch = _t.first);
      }
    },
    hostAttrs: [1, "mdc-notched-outline"],
    hostVars: 2,
    hostBindings: function MatFormFieldNotchedOutline_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mdc-notched-outline--notched", ctx.open);
      }
    },
    inputs: {
      open: [0, "matFormFieldNotchedOutlineOpen", "open"]
    },
    attrs: _c12,
    ngContentSelectors: _c22,
    decls: 5,
    vars: 0,
    consts: [["notch", ""], [1, "mat-mdc-notch-piece", "mdc-notched-outline__leading"], [1, "mat-mdc-notch-piece", "mdc-notched-outline__notch"], [1, "mat-mdc-notch-piece", "mdc-notched-outline__trailing"]],
    template: function MatFormFieldNotchedOutline_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275element(0, "div", 1);
        \u0275\u0275elementStart(1, "div", 2, 0);
        \u0275\u0275projection(3);
        \u0275\u0275elementEnd();
        \u0275\u0275element(4, "div", 3);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldNotchedOutline, [{
    type: Component,
    args: [{
      selector: "div[matFormFieldNotchedOutline]",
      host: {
        "class": "mdc-notched-outline",
        // Besides updating the notch state through the MDC component, we toggle this class through
        // a host binding in order to ensure that the notched-outline renders correctly on the server.
        "[class.mdc-notched-outline--notched]": "open"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: '<div class="mat-mdc-notch-piece mdc-notched-outline__leading"></div>\n<div class="mat-mdc-notch-piece mdc-notched-outline__notch" #notch>\n  <ng-content></ng-content>\n</div>\n<div class="mat-mdc-notch-piece mdc-notched-outline__trailing"></div>\n'
    }]
  }], () => [], {
    open: [{
      type: Input,
      args: ["matFormFieldNotchedOutlineOpen"]
    }],
    _notch: [{
      type: ViewChild,
      args: ["notch"]
    }]
  });
})();
var MatFormFieldControl = class _MatFormFieldControl {
  /** The value of the control. */
  value;
  /**
   * Stream that emits whenever the state of the control changes such that the parent `MatFormField`
   * needs to run change detection.
   */
  stateChanges;
  /** The element ID for this control. */
  id;
  /** The placeholder for this control. */
  placeholder;
  /** Gets the AbstractControlDirective for this control. */
  ngControl;
  /** Whether the control is focused. */
  focused;
  /** Whether the control is empty. */
  empty;
  /** Whether the `MatFormField` label should try to float. */
  shouldLabelFloat;
  /** Whether the control is required. */
  required;
  /** Whether the control is disabled. */
  disabled;
  /** Whether the control is in an error state. */
  errorState;
  /**
   * An optional name for the control type that can be used to distinguish `mat-form-field` elements
   * based on their control type. The form field will add a class,
   * `mat-form-field-type-{{controlType}}` to its root element.
   */
  controlType;
  /**
   * Whether the input is currently in an autofilled state. If property is not present on the
   * control it is assumed to be false.
   */
  autofilled;
  /**
   * Value of `aria-describedby` that should be merged with the described-by ids
   * which are set by the form-field.
   */
  userAriaDescribedBy;
  /**
   * Whether to automatically assign the ID of the form field as the `for` attribute
   * on the `<label>` inside the form field. Set this to true to prevent the form
   * field from associating the label with non-native elements.
   */
  disableAutomaticLabeling;
  static \u0275fac = function MatFormFieldControl_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldControl)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatFormFieldControl
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldControl, [{
    type: Directive
  }], null, null);
})();
function getMatFormFieldDuplicatedHintError(align) {
  return Error(`A hint was already declared for 'align="${align}"'.`);
}
function getMatFormFieldMissingControlError() {
  return Error("mat-form-field must contain a MatFormFieldControl.");
}
var MAT_FORM_FIELD = new InjectionToken("MatFormField");
var MAT_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken("MAT_FORM_FIELD_DEFAULT_OPTIONS");
var DEFAULT_APPEARANCE = "fill";
var DEFAULT_FLOAT_LABEL = "auto";
var DEFAULT_SUBSCRIPT_SIZING = "fixed";
var FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM = `translateY(-50%)`;
var MatFormField = class _MatFormField {
  _elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _dir = inject(Directionality);
  _platform = inject(Platform);
  _idGenerator = inject(_IdGenerator);
  _ngZone = inject(NgZone);
  _injector = inject(Injector);
  _defaults = inject(MAT_FORM_FIELD_DEFAULT_OPTIONS, {
    optional: true
  });
  _textField;
  _iconPrefixContainer;
  _textPrefixContainer;
  _iconSuffixContainer;
  _textSuffixContainer;
  _floatingLabel;
  _notchedOutline;
  _lineRipple;
  _formFieldControl;
  _prefixChildren;
  _suffixChildren;
  _errorChildren;
  _hintChildren;
  _labelChild = contentChild(MatLabel);
  /** Whether the required marker should be hidden. */
  get hideRequiredMarker() {
    return this._hideRequiredMarker;
  }
  set hideRequiredMarker(value) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }
  _hideRequiredMarker = false;
  /**
   * Theme color of the form field. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/form-field/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  color = "primary";
  /** Whether the label should always float or float as the user types. */
  get floatLabel() {
    return this._floatLabel || this._defaults?.floatLabel || DEFAULT_FLOAT_LABEL;
  }
  set floatLabel(value) {
    if (value !== this._floatLabel) {
      this._floatLabel = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  _floatLabel;
  /** The form field appearance style. */
  get appearance() {
    return this._appearance;
  }
  set appearance(value) {
    const oldValue = this._appearance;
    const newAppearance = value || this._defaults?.appearance || DEFAULT_APPEARANCE;
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (newAppearance !== "fill" && newAppearance !== "outline") {
        throw new Error(`MatFormField: Invalid appearance "${newAppearance}", valid values are "fill" or "outline".`);
      }
    }
    this._appearance = newAppearance;
    if (this._appearance === "outline" && this._appearance !== oldValue) {
      this._needsOutlineLabelOffsetUpdate = true;
    }
  }
  _appearance = DEFAULT_APPEARANCE;
  /**
   * Whether the form field should reserve space for one line of hint/error text (default)
   * or to have the spacing grow from 0px as needed based on the size of the hint/error content.
   * Note that when using dynamic sizing, layout shifts will occur when hint/error text changes.
   */
  get subscriptSizing() {
    return this._subscriptSizing || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
  }
  set subscriptSizing(value) {
    this._subscriptSizing = value || this._defaults?.subscriptSizing || DEFAULT_SUBSCRIPT_SIZING;
  }
  _subscriptSizing = null;
  /** Text for the form field hint. */
  get hintLabel() {
    return this._hintLabel;
  }
  set hintLabel(value) {
    this._hintLabel = value;
    this._processHints();
  }
  _hintLabel = "";
  _hasIconPrefix = false;
  _hasTextPrefix = false;
  _hasIconSuffix = false;
  _hasTextSuffix = false;
  // Unique id for the internal form field label.
  _labelId = this._idGenerator.getId("mat-mdc-form-field-label-");
  // Unique id for the hint label.
  _hintLabelId = this._idGenerator.getId("mat-mdc-hint-");
  /** Gets the current form field control */
  get _control() {
    return this._explicitFormFieldControl || this._formFieldControl;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }
  _destroyed = new Subject();
  _isFocused = null;
  _explicitFormFieldControl;
  _needsOutlineLabelOffsetUpdate = false;
  _previousControl = null;
  _previousControlValidatorFn = null;
  _stateChanges;
  _valueChanges;
  _describedByChanges;
  _animationsDisabled;
  constructor() {
    const defaults = this._defaults;
    if (defaults) {
      if (defaults.appearance) {
        this.appearance = defaults.appearance;
      }
      this._hideRequiredMarker = Boolean(defaults?.hideRequiredMarker);
      if (defaults.color) {
        this.color = defaults.color;
      }
    }
    this._animationsDisabled = inject(ANIMATION_MODULE_TYPE, {
      optional: true
    }) === "NoopAnimations";
  }
  ngAfterViewInit() {
    this._updateFocusState();
    if (!this._animationsDisabled) {
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");
        }, 300);
      });
    }
    this._changeDetectorRef.detectChanges();
  }
  ngAfterContentInit() {
    this._assertFormFieldControl();
    this._initializeSubscript();
    this._initializePrefixAndSuffix();
    this._initializeOutlineLabelOffsetSubscriptions();
  }
  ngAfterContentChecked() {
    this._assertFormFieldControl();
    if (this._control !== this._previousControl) {
      this._initializeControl(this._previousControl);
      if (this._control.ngControl && this._control.ngControl.control) {
        this._previousControlValidatorFn = this._control.ngControl.control.validator;
      }
      this._previousControl = this._control;
    }
    if (this._control.ngControl && this._control.ngControl.control) {
      const validatorFn = this._control.ngControl.control.validator;
      if (validatorFn !== this._previousControlValidatorFn) {
        this._changeDetectorRef.markForCheck();
      }
    }
  }
  ngOnDestroy() {
    this._stateChanges?.unsubscribe();
    this._valueChanges?.unsubscribe();
    this._describedByChanges?.unsubscribe();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /**
   * Gets the id of the label element. If no label is present, returns `null`.
   */
  getLabelId = computed(() => this._hasFloatingLabel() ? this._labelId : null);
  /**
   * Gets an ElementRef for the element that a overlay attached to the form field
   * should be positioned relative to.
   */
  getConnectedOverlayOrigin() {
    return this._textField || this._elementRef;
  }
  /** Animates the placeholder up and locks it in position. */
  _animateAndLockLabel() {
    if (this._hasFloatingLabel()) {
      this.floatLabel = "always";
    }
  }
  /** Initializes the registered form field control. */
  _initializeControl(previousControl) {
    const control = this._control;
    const classPrefix = "mat-mdc-form-field-type-";
    if (previousControl) {
      this._elementRef.nativeElement.classList.remove(classPrefix + previousControl.controlType);
    }
    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(classPrefix + control.controlType);
    }
    this._stateChanges?.unsubscribe();
    this._stateChanges = control.stateChanges.subscribe(() => {
      this._updateFocusState();
      this._changeDetectorRef.markForCheck();
    });
    this._describedByChanges?.unsubscribe();
    this._describedByChanges = control.stateChanges.pipe(startWith([void 0, void 0]), map(() => [control.errorState, control.userAriaDescribedBy]), pairwise(), filter(([[prevErrorState, prevDescribedBy], [currentErrorState, currentDescribedBy]]) => {
      return prevErrorState !== currentErrorState || prevDescribedBy !== currentDescribedBy;
    })).subscribe(() => this._syncDescribedByIds());
    this._valueChanges?.unsubscribe();
    if (control.ngControl && control.ngControl.valueChanges) {
      this._valueChanges = control.ngControl.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(() => this._changeDetectorRef.markForCheck());
    }
  }
  _checkPrefixAndSuffixTypes() {
    this._hasIconPrefix = !!this._prefixChildren.find((p) => !p._isText);
    this._hasTextPrefix = !!this._prefixChildren.find((p) => p._isText);
    this._hasIconSuffix = !!this._suffixChildren.find((s) => !s._isText);
    this._hasTextSuffix = !!this._suffixChildren.find((s) => s._isText);
  }
  /** Initializes the prefix and suffix containers. */
  _initializePrefixAndSuffix() {
    this._checkPrefixAndSuffixTypes();
    merge(this._prefixChildren.changes, this._suffixChildren.changes).subscribe(() => {
      this._checkPrefixAndSuffixTypes();
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * Initializes the subscript by validating hints and synchronizing "aria-describedby" ids
   * with the custom form field control. Also subscribes to hint and error changes in order
   * to be able to validate and synchronize ids on change.
   */
  _initializeSubscript() {
    this._hintChildren.changes.subscribe(() => {
      this._processHints();
      this._changeDetectorRef.markForCheck();
    });
    this._errorChildren.changes.subscribe(() => {
      this._syncDescribedByIds();
      this._changeDetectorRef.markForCheck();
    });
    this._validateHints();
    this._syncDescribedByIds();
  }
  /** Throws an error if the form field's control is missing. */
  _assertFormFieldControl() {
    if (!this._control && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatFormFieldMissingControlError();
    }
  }
  _updateFocusState() {
    if (this._control.focused && !this._isFocused) {
      this._isFocused = true;
      this._lineRipple?.activate();
    } else if (!this._control.focused && (this._isFocused || this._isFocused === null)) {
      this._isFocused = false;
      this._lineRipple?.deactivate();
    }
    this._textField?.nativeElement.classList.toggle("mdc-text-field--focused", this._control.focused);
  }
  /**
   * The floating label in the docked state needs to account for prefixes. The horizontal offset
   * is calculated whenever the appearance changes to `outline`, the prefixes change, or when the
   * form field is added to the DOM. This method sets up all subscriptions which are needed to
   * trigger the label offset update.
   */
  _initializeOutlineLabelOffsetSubscriptions() {
    this._prefixChildren.changes.subscribe(() => this._needsOutlineLabelOffsetUpdate = true);
    afterRender(() => {
      if (this._needsOutlineLabelOffsetUpdate) {
        this._needsOutlineLabelOffsetUpdate = false;
        this._updateOutlineLabelOffset();
      }
    }, {
      injector: this._injector
    });
    this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => this._needsOutlineLabelOffsetUpdate = true);
  }
  /** Whether the floating label should always float or not. */
  _shouldAlwaysFloat() {
    return this.floatLabel === "always";
  }
  _hasOutline() {
    return this.appearance === "outline";
  }
  /**
   * Whether the label should display in the infix. Labels in the outline appearance are
   * displayed as part of the notched-outline and are horizontally offset to account for
   * form field prefix content. This won't work in server side rendering since we cannot
   * measure the width of the prefix container. To make the docked label appear as if the
   * right offset has been calculated, we forcibly render the label inside the infix. Since
   * the label is part of the infix, the label cannot overflow the prefix content.
   */
  _forceDisplayInfixLabel() {
    return !this._platform.isBrowser && this._prefixChildren.length && !this._shouldLabelFloat();
  }
  _hasFloatingLabel = computed(() => !!this._labelChild());
  _shouldLabelFloat() {
    if (!this._hasFloatingLabel()) {
      return false;
    }
    return this._control.shouldLabelFloat || this._shouldAlwaysFloat();
  }
  /**
   * Determines whether a class from the AbstractControlDirective
   * should be forwarded to the host element.
   */
  _shouldForward(prop) {
    const control = this._control ? this._control.ngControl : null;
    return control && control[prop];
  }
  /** Gets the type of subscript message to render (error or hint). */
  _getSubscriptMessageType() {
    return this._errorChildren && this._errorChildren.length > 0 && this._control.errorState ? "error" : "hint";
  }
  /** Handle label resize events. */
  _handleLabelResized() {
    this._refreshOutlineNotchWidth();
  }
  /** Refreshes the width of the outline-notch, if present. */
  _refreshOutlineNotchWidth() {
    if (!this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat()) {
      this._notchedOutline?._setNotchWidth(0);
    } else {
      this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());
    }
  }
  /** Does any extra processing that is required when handling the hints. */
  _processHints() {
    this._validateHints();
    this._syncDescribedByIds();
  }
  /**
   * Ensure that there is a maximum of one of each "mat-hint" alignment specified. The hint
   * label specified set through the input is being considered as "start" aligned.
   *
   * This method is a noop if Angular runs in production mode.
   */
  _validateHints() {
    if (this._hintChildren && (typeof ngDevMode === "undefined" || ngDevMode)) {
      let startHint;
      let endHint;
      this._hintChildren.forEach((hint) => {
        if (hint.align === "start") {
          if (startHint || this.hintLabel) {
            throw getMatFormFieldDuplicatedHintError("start");
          }
          startHint = hint;
        } else if (hint.align === "end") {
          if (endHint) {
            throw getMatFormFieldDuplicatedHintError("end");
          }
          endHint = hint;
        }
      });
    }
  }
  /**
   * Sets the list of element IDs that describe the child control. This allows the control to update
   * its `aria-describedby` attribute accordingly.
   */
  _syncDescribedByIds() {
    if (this._control) {
      let ids = [];
      if (this._control.userAriaDescribedBy && typeof this._control.userAriaDescribedBy === "string") {
        ids.push(...this._control.userAriaDescribedBy.split(" "));
      }
      if (this._getSubscriptMessageType() === "hint") {
        const startHint = this._hintChildren ? this._hintChildren.find((hint) => hint.align === "start") : null;
        const endHint = this._hintChildren ? this._hintChildren.find((hint) => hint.align === "end") : null;
        if (startHint) {
          ids.push(startHint.id);
        } else if (this._hintLabel) {
          ids.push(this._hintLabelId);
        }
        if (endHint) {
          ids.push(endHint.id);
        }
      } else if (this._errorChildren) {
        ids.push(...this._errorChildren.map((error) => error.id));
      }
      this._control.setDescribedByIds(ids);
    }
  }
  /**
   * Updates the horizontal offset of the label in the outline appearance. In the outline
   * appearance, the notched-outline and label are not relative to the infix container because
   * the outline intends to surround prefixes, suffixes and the infix. This means that the
   * floating label by default overlaps prefixes in the docked state. To avoid this, we need to
   * horizontally offset the label by the width of the prefix container. The MDC text-field does
   * not need to do this because they use a fixed width for prefixes. Hence, they can simply
   * incorporate the horizontal offset into their default text-field styles.
   */
  _updateOutlineLabelOffset() {
    if (!this._hasOutline() || !this._floatingLabel) {
      return;
    }
    const floatingLabel = this._floatingLabel.element;
    if (!(this._iconPrefixContainer || this._textPrefixContainer)) {
      floatingLabel.style.transform = "";
      return;
    }
    if (!this._isAttachedToDom()) {
      this._needsOutlineLabelOffsetUpdate = true;
      return;
    }
    const iconPrefixContainer = this._iconPrefixContainer?.nativeElement;
    const textPrefixContainer = this._textPrefixContainer?.nativeElement;
    const iconSuffixContainer = this._iconSuffixContainer?.nativeElement;
    const textSuffixContainer = this._textSuffixContainer?.nativeElement;
    const iconPrefixContainerWidth = iconPrefixContainer?.getBoundingClientRect().width ?? 0;
    const textPrefixContainerWidth = textPrefixContainer?.getBoundingClientRect().width ?? 0;
    const iconSuffixContainerWidth = iconSuffixContainer?.getBoundingClientRect().width ?? 0;
    const textSuffixContainerWidth = textSuffixContainer?.getBoundingClientRect().width ?? 0;
    const negate = this._dir.value === "rtl" ? "-1" : "1";
    const prefixWidth = `${iconPrefixContainerWidth + textPrefixContainerWidth}px`;
    const labelOffset = `var(--mat-mdc-form-field-label-offset-x, 0px)`;
    const labelHorizontalOffset = `calc(${negate} * (${prefixWidth} + ${labelOffset}))`;
    floatingLabel.style.transform = `var(
        --mat-mdc-form-field-label-transform,
        ${FLOATING_LABEL_DEFAULT_DOCKED_TRANSFORM} translateX(${labelHorizontalOffset})
    )`;
    const prefixAndSuffixWidth = iconPrefixContainerWidth + textPrefixContainerWidth + iconSuffixContainerWidth + textSuffixContainerWidth;
    this._elementRef.nativeElement.style.setProperty("--mat-form-field-notch-max-width", `calc(100% - ${prefixAndSuffixWidth}px)`);
  }
  /** Checks whether the form field is attached to the DOM. */
  _isAttachedToDom() {
    const element = this._elementRef.nativeElement;
    if (element.getRootNode) {
      const rootNode = element.getRootNode();
      return rootNode && rootNode !== element;
    }
    return document.documentElement.contains(element);
  }
  static \u0275fac = function MatFormField_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormField)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatFormField,
    selectors: [["mat-form-field"]],
    contentQueries: function MatFormField_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        \u0275\u0275contentQuerySignal(dirIndex, ctx._labelChild, MatLabel, 5);
        \u0275\u0275contentQuery(dirIndex, MatFormFieldControl, 5);
        \u0275\u0275contentQuery(dirIndex, MAT_PREFIX, 5);
        \u0275\u0275contentQuery(dirIndex, MAT_SUFFIX, 5);
        \u0275\u0275contentQuery(dirIndex, MAT_ERROR, 5);
        \u0275\u0275contentQuery(dirIndex, MatHint, 5);
      }
      if (rf & 2) {
        \u0275\u0275queryAdvance();
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._formFieldControl = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._prefixChildren = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._suffixChildren = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._errorChildren = _t);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._hintChildren = _t);
      }
    },
    viewQuery: function MatFormField_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c32, 5);
        \u0275\u0275viewQuery(_c42, 5);
        \u0275\u0275viewQuery(_c52, 5);
        \u0275\u0275viewQuery(_c6, 5);
        \u0275\u0275viewQuery(_c7, 5);
        \u0275\u0275viewQuery(MatFormFieldFloatingLabel, 5);
        \u0275\u0275viewQuery(MatFormFieldNotchedOutline, 5);
        \u0275\u0275viewQuery(MatFormFieldLineRipple, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._textField = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._iconPrefixContainer = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._textPrefixContainer = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._iconSuffixContainer = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._textSuffixContainer = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._floatingLabel = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._notchedOutline = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lineRipple = _t.first);
      }
    },
    hostAttrs: [1, "mat-mdc-form-field"],
    hostVars: 40,
    hostBindings: function MatFormField_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mat-mdc-form-field-label-always-float", ctx._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix", ctx._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix", ctx._hasIconSuffix)("mat-form-field-invalid", ctx._control.errorState)("mat-form-field-disabled", ctx._control.disabled)("mat-form-field-autofilled", ctx._control.autofilled)("mat-form-field-appearance-fill", ctx.appearance == "fill")("mat-form-field-appearance-outline", ctx.appearance == "outline")("mat-form-field-hide-placeholder", ctx._hasFloatingLabel() && !ctx._shouldLabelFloat())("mat-focused", ctx._control.focused)("mat-primary", ctx.color !== "accent" && ctx.color !== "warn")("mat-accent", ctx.color === "accent")("mat-warn", ctx.color === "warn")("ng-untouched", ctx._shouldForward("untouched"))("ng-touched", ctx._shouldForward("touched"))("ng-pristine", ctx._shouldForward("pristine"))("ng-dirty", ctx._shouldForward("dirty"))("ng-valid", ctx._shouldForward("valid"))("ng-invalid", ctx._shouldForward("invalid"))("ng-pending", ctx._shouldForward("pending"));
      }
    },
    inputs: {
      hideRequiredMarker: "hideRequiredMarker",
      color: "color",
      floatLabel: "floatLabel",
      appearance: "appearance",
      subscriptSizing: "subscriptSizing",
      hintLabel: "hintLabel"
    },
    exportAs: ["matFormField"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MAT_FORM_FIELD,
      useExisting: _MatFormField
    }, {
      provide: FLOATING_LABEL_PARENT,
      useExisting: _MatFormField
    }])],
    ngContentSelectors: _c9,
    decls: 20,
    vars: 25,
    consts: [["labelTemplate", ""], ["textField", ""], ["iconPrefixContainer", ""], ["textPrefixContainer", ""], ["textSuffixContainer", ""], ["iconSuffixContainer", ""], [1, "mat-mdc-text-field-wrapper", "mdc-text-field", 3, "click"], [1, "mat-mdc-form-field-focus-overlay"], [1, "mat-mdc-form-field-flex"], ["matFormFieldNotchedOutline", "", 3, "matFormFieldNotchedOutlineOpen"], [1, "mat-mdc-form-field-icon-prefix"], [1, "mat-mdc-form-field-text-prefix"], [1, "mat-mdc-form-field-infix"], [3, "ngTemplateOutlet"], [1, "mat-mdc-form-field-text-suffix"], [1, "mat-mdc-form-field-icon-suffix"], ["matFormFieldLineRipple", ""], [1, "mat-mdc-form-field-subscript-wrapper", "mat-mdc-form-field-bottom-align"], ["aria-atomic", "true", "aria-live", "polite"], ["matFormFieldFloatingLabel", "", 3, "floating", "monitorResize", "id"], ["aria-hidden", "true", 1, "mat-mdc-form-field-required-marker", "mdc-floating-label--required"], [3, "id"], [1, "mat-mdc-form-field-hint-spacer"]],
    template: function MatFormField_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275projectionDef(_c8);
        \u0275\u0275template(0, MatFormField_ng_template_0_Template, 1, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(2, "div", 6, 1);
        \u0275\u0275listener("click", function MatFormField_Template_div_click_2_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx._control.onContainerClick($event));
        });
        \u0275\u0275template(4, MatFormField_Conditional_4_Template, 1, 0, "div", 7);
        \u0275\u0275elementStart(5, "div", 8);
        \u0275\u0275template(6, MatFormField_Conditional_6_Template, 2, 2, "div", 9)(7, MatFormField_Conditional_7_Template, 3, 0, "div", 10)(8, MatFormField_Conditional_8_Template, 3, 0, "div", 11);
        \u0275\u0275elementStart(9, "div", 12);
        \u0275\u0275template(10, MatFormField_Conditional_10_Template, 1, 1, null, 13);
        \u0275\u0275projection(11);
        \u0275\u0275elementEnd();
        \u0275\u0275template(12, MatFormField_Conditional_12_Template, 3, 0, "div", 14)(13, MatFormField_Conditional_13_Template, 3, 0, "div", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275template(14, MatFormField_Conditional_14_Template, 1, 0, "div", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "div", 17);
        \u0275\u0275declareLet(16);
        \u0275\u0275elementStart(17, "div", 18);
        \u0275\u0275template(18, MatFormField_Case_18_Template, 1, 0)(19, MatFormField_Case_19_Template, 4, 1);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        let tmp_19_0;
        \u0275\u0275advance(2);
        \u0275\u0275classProp("mdc-text-field--filled", !ctx._hasOutline())("mdc-text-field--outlined", ctx._hasOutline())("mdc-text-field--no-label", !ctx._hasFloatingLabel())("mdc-text-field--disabled", ctx._control.disabled)("mdc-text-field--invalid", ctx._control.errorState);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(!ctx._hasOutline() && !ctx._control.disabled ? 4 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx._hasOutline() ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx._hasIconPrefix ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx._hasTextPrefix ? 8 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(!ctx._hasOutline() || ctx._forceDisplayInfixLabel() ? 10 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx._hasTextSuffix ? 12 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx._hasIconSuffix ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx._hasOutline() ? 14 : -1);
        \u0275\u0275advance();
        \u0275\u0275classProp("mat-mdc-form-field-subscript-dynamic-size", ctx.subscriptSizing === "dynamic");
        const subscriptMessageType_r4 = ctx._getSubscriptMessageType();
        \u0275\u0275advance(2);
        \u0275\u0275classProp("mat-mdc-form-field-error-wrapper", subscriptMessageType_r4 === "error")("mat-mdc-form-field-hint-wrapper", subscriptMessageType_r4 === "hint");
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_19_0 = subscriptMessageType_r4) === "error" ? 18 : tmp_19_0 === "hint" ? 19 : -1);
      }
    },
    dependencies: [MatFormFieldFloatingLabel, MatFormFieldNotchedOutline, NgTemplateOutlet, MatFormFieldLineRipple, MatHint],
    styles: ['.mdc-text-field{display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field__input{width:100%;min-width:0;border:none;border-radius:0;background:none;padding:0;-moz-appearance:none;-webkit-appearance:none;height:28px}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}.mdc-text-field__input::placeholder{opacity:0}.mdc-text-field__input::-moz-placeholder{opacity:0}.mdc-text-field__input::-webkit-input-placeholder{opacity:0}.mdc-text-field__input:-ms-input-placeholder{opacity:0}.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder,.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder{opacity:1}.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder,.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder{opacity:1}.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder{opacity:0}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder{opacity:0}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder{opacity:0}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder{opacity:0}.mdc-text-field--outlined .mdc-text-field__input,.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-filled-text-field-input-text-color, var(--mat-sys-on-surface));caret-color:var(--mdc-filled-text-field-caret-color, var(--mat-sys-primary))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-error-caret-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-filled-text-field-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-outlined-text-field-input-text-color, var(--mat-sys-on-surface));caret-color:var(--mdc-outlined-text-field-caret-color, var(--mat-sys-primary))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-error-caret-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-outlined-text-field-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}@media(forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}}.mdc-text-field--filled{height:56px;border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:var(--mdc-filled-text-field-container-shape, var(--mat-sys-corner-extra-small));border-top-right-radius:var(--mdc-filled-text-field-container-shape, var(--mat-sys-corner-extra-small))}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mdc-filled-text-field-container-color, var(--mat-sys-surface-variant))}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mdc-filled-text-field-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent))}.mdc-text-field--outlined{height:56px;overflow:visible;padding-right:max(16px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)));padding-left:max(16px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)) + 4px)}[dir=rtl] .mdc-text-field--outlined{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)) + 4px);padding-left:max(16px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)))}.mdc-floating-label{position:absolute;left:0;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label{right:0;left:auto;transform-origin:right top;text-align:right}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:auto}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label{left:auto;right:4px}.mdc-text-field--filled .mdc-floating-label{left:16px;right:auto}[dir=rtl] .mdc-text-field--filled .mdc-floating-label{left:auto;right:16px}.mdc-text-field--disabled .mdc-floating-label{cursor:default}@media(forced-colors: active){.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label{color:var(--mdc-filled-text-field-label-text-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label{color:var(--mdc-filled-text-field-focus-label-text-color, var(--mat-sys-primary))}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label{color:var(--mdc-filled-text-field-hover-label-text-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label{color:var(--mdc-filled-text-field-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label{color:var(--mdc-filled-text-field-error-label-text-color, var(--mat-sys-error))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label{color:var(--mdc-filled-text-field-error-focus-label-text-color, var(--mat-sys-error))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label{color:var(--mdc-filled-text-field-error-hover-label-text-color, var(--mat-sys-on-error-container))}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mdc-filled-text-field-label-text-font, var(--mat-sys-body-large-font));font-size:var(--mdc-filled-text-field-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-filled-text-field-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-filled-text-field-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label{color:var(--mdc-outlined-text-field-label-text-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label{color:var(--mdc-outlined-text-field-focus-label-text-color, var(--mat-sys-primary))}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label{color:var(--mdc-outlined-text-field-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label{color:var(--mdc-outlined-text-field-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label{color:var(--mdc-outlined-text-field-error-label-text-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label{color:var(--mdc-outlined-text-field-error-focus-label-text-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label{color:var(--mdc-outlined-text-field-error-hover-label-text-color, var(--mat-sys-on-error-container))}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mdc-outlined-text-field-label-text-font, var(--mat-sys-body-large-font));font-size:var(--mdc-outlined-text-field-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-outlined-text-field-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-outlined-text-field-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-floating-label--float-above{cursor:auto;transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1);font-size:.75rem}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline{text-align:right}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mat-mdc-notch-piece{box-sizing:border-box;height:100%;pointer-events:none;border-top:1px solid;border-bottom:1px solid}.mdc-text-field--focused .mat-mdc-notch-piece{border-width:2px}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-outline-color, var(--mat-sys-outline));border-width:var(--mdc-outlined-text-field-outline-width, 1px)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-hover-outline-color, var(--mat-sys-on-surface))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-focus-outline-color, var(--mat-sys-primary))}.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-error-outline-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-error-hover-outline-color, var(--mat-sys-on-error-container))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-error-focus-outline-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece{border-width:var(--mdc-outlined-text-field-focus-outline-width, 2px)}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;border-top-left-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small));border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small))}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)))}[dir=rtl] .mdc-notched-outline__leading{border-left:none;border-right:1px solid;border-bottom-left-radius:0;border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small));border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small))}.mdc-notched-outline__trailing{flex-grow:1;border-left:none;border-right:1px solid;border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small));border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small))}[dir=rtl] .mdc-notched-outline__trailing{border-left:1px solid;border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;border-top-left-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small));border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small))}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:min(var(--mat-form-field-notch-max-width, 100%),100% - max(12px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)))*2)}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none;--mat-form-field-notch-max-width: 100%}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{z-index:1;border-bottom-width:var(--mdc-filled-text-field-active-indicator-height, 1px)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-active-indicator-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-hover-active-indicator-color, var(--mat-sys-on-surface))}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-active-indicator-color, var(--mat-sys-error))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-hover-active-indicator-color, var(--mat-sys-on-error-container))}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mdc-filled-text-field-focus-active-indicator-height, 2px)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-focus-active-indicator-color, var(--mat-sys-primary))}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-error-focus-active-indicator-color, var(--mat-sys-error))}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-text-field--disabled{pointer-events:none}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all;will-change:auto}.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label{cursor:inherit}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto;will-change:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:1px solid rgba(0,0,0,0)}[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:none;border-right:1px solid rgba(0,0,0,0)}.mat-mdc-form-field-infix{min-height:var(--mat-form-field-container-height, 56px);padding-top:var(--mat-form-field-filled-with-label-container-padding-top, 24px);padding-bottom:var(--mat-form-field-filled-with-label-container-padding-bottom, 8px)}.mdc-text-field--outlined .mat-mdc-form-field-infix,.mdc-text-field--no-label .mat-mdc-form-field-infix{padding-top:var(--mat-form-field-container-vertical-padding, 16px);padding-bottom:var(--mat-form-field-container-vertical-padding, 16px)}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:calc(var(--mat-form-field-container-height, 56px)/2)}.mdc-text-field--filled .mat-mdc-floating-label{display:var(--mat-form-field-filled-label-display, block)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1)) scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));transform:var(--mat-mdc-form-field-label-transform)}@keyframes _mat-form-field-subscript-animation{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px;opacity:1;transform:translateY(0);animation:_mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block;color:var(--mat-form-field-error-text-color, var(--mat-sys-error))}.mat-mdc-form-field-subscript-wrapper,.mat-mdc-form-field-bottom-align::before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));line-height:var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));font-size:var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));letter-spacing:var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));font-weight:var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight))}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none;background-color:var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface))}.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-focus-state-layer-opacity, 0)}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option{color:var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10))}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled{color:var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent))}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none;color:var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant))}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after{color:var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary))}.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after{color:var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}@media(forced-colors: active){.mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}}@media(forced-colors: active){.mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}}@media(forced-colors: active){.mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}}@media(forced-colors: active){.mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));line-height:var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));letter-spacing:var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));font-weight:var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size)*var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%;z-index:0}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:0 12px;box-sizing:content-box}.mat-mdc-form-field-icon-prefix{color:var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant))}.mat-form-field-disabled .mat-mdc-form-field-icon-prefix{color:var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant))}.mat-form-field-disabled .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-invalid .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error))}.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container))}.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error))}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field-infix:has(textarea[cols]){width:auto}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper{animation-duration:300ms}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}\n'],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormField, [{
    type: Component,
    args: [{
      selector: "mat-form-field",
      exportAs: "matFormField",
      host: {
        "class": "mat-mdc-form-field",
        "[class.mat-mdc-form-field-label-always-float]": "_shouldAlwaysFloat()",
        "[class.mat-mdc-form-field-has-icon-prefix]": "_hasIconPrefix",
        "[class.mat-mdc-form-field-has-icon-suffix]": "_hasIconSuffix",
        // Note that these classes reuse the same names as the non-MDC version, because they can be
        // considered a public API since custom form controls may use them to style themselves.
        // See https://github.com/angular/components/pull/20502#discussion_r486124901.
        "[class.mat-form-field-invalid]": "_control.errorState",
        "[class.mat-form-field-disabled]": "_control.disabled",
        "[class.mat-form-field-autofilled]": "_control.autofilled",
        "[class.mat-form-field-appearance-fill]": 'appearance == "fill"',
        "[class.mat-form-field-appearance-outline]": 'appearance == "outline"',
        "[class.mat-form-field-hide-placeholder]": "_hasFloatingLabel() && !_shouldLabelFloat()",
        "[class.mat-focused]": "_control.focused",
        "[class.mat-primary]": 'color !== "accent" && color !== "warn"',
        "[class.mat-accent]": 'color === "accent"',
        "[class.mat-warn]": 'color === "warn"',
        "[class.ng-untouched]": '_shouldForward("untouched")',
        "[class.ng-touched]": '_shouldForward("touched")',
        "[class.ng-pristine]": '_shouldForward("pristine")',
        "[class.ng-dirty]": '_shouldForward("dirty")',
        "[class.ng-valid]": '_shouldForward("valid")',
        "[class.ng-invalid]": '_shouldForward("invalid")',
        "[class.ng-pending]": '_shouldForward("pending")'
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: MAT_FORM_FIELD,
        useExisting: MatFormField
      }, {
        provide: FLOATING_LABEL_PARENT,
        useExisting: MatFormField
      }],
      imports: [MatFormFieldFloatingLabel, MatFormFieldNotchedOutline, NgTemplateOutlet, MatFormFieldLineRipple, MatHint],
      template: '<ng-template #labelTemplate>\n  <!--\n    MDC recommends that the text-field is a `<label>` element. This rather complicates the\n    setup because it would require every form-field control to explicitly set `aria-labelledby`.\n    This is because the `<label>` itself contains more than the actual label (e.g. prefix, suffix\n    or other projected content), and screen readers could potentially read out undesired content.\n    Excluding elements from being printed out requires them to be marked with `aria-hidden`, or\n    the form control is set to a scoped element for the label (using `aria-labelledby`). Both of\n    these options seem to complicate the setup because we know exactly what content is rendered\n    as part of the label, and we don\'t want to spend resources on walking through projected content\n    to set `aria-hidden`. Nor do we want to set `aria-labelledby` on every form control if we could\n    simply link the label to the control using the label `for` attribute.\n  -->\n  @if (_hasFloatingLabel()) {\n    <label\n      matFormFieldFloatingLabel\n      [floating]="_shouldLabelFloat()"\n      [monitorResize]="_hasOutline()"\n      [id]="_labelId"\n      [attr.for]="_control.disableAutomaticLabeling ? null : _control.id"\n    >\n      <ng-content select="mat-label"></ng-content>\n      <!--\n        We set the required marker as a separate element, in order to make it easier to target if\n        apps want to override it and to be able to set `aria-hidden` so that screen readers don\'t\n        pick it up.\n       -->\n      @if (!hideRequiredMarker && _control.required) {\n        <span\n          aria-hidden="true"\n          class="mat-mdc-form-field-required-marker mdc-floating-label--required"\n        ></span>\n      }\n    </label>\n  }\n</ng-template>\n\n<div\n  class="mat-mdc-text-field-wrapper mdc-text-field"\n  #textField\n  [class.mdc-text-field--filled]="!_hasOutline()"\n  [class.mdc-text-field--outlined]="_hasOutline()"\n  [class.mdc-text-field--no-label]="!_hasFloatingLabel()"\n  [class.mdc-text-field--disabled]="_control.disabled"\n  [class.mdc-text-field--invalid]="_control.errorState"\n  (click)="_control.onContainerClick($event)"\n>\n  @if (!_hasOutline() && !_control.disabled) {\n    <div class="mat-mdc-form-field-focus-overlay"></div>\n  }\n  <div class="mat-mdc-form-field-flex">\n    @if (_hasOutline()) {\n      <div matFormFieldNotchedOutline [matFormFieldNotchedOutlineOpen]="_shouldLabelFloat()">\n        @if (!_forceDisplayInfixLabel()) {\n          <ng-template [ngTemplateOutlet]="labelTemplate"></ng-template>\n        }\n      </div>\n    }\n\n    @if (_hasIconPrefix) {\n      <div class="mat-mdc-form-field-icon-prefix" #iconPrefixContainer>\n        <ng-content select="[matPrefix], [matIconPrefix]"></ng-content>\n      </div>\n    }\n\n    @if (_hasTextPrefix) {\n      <div class="mat-mdc-form-field-text-prefix" #textPrefixContainer>\n        <ng-content select="[matTextPrefix]"></ng-content>\n      </div>\n    }\n\n    <div class="mat-mdc-form-field-infix">\n      @if (!_hasOutline() || _forceDisplayInfixLabel()) {\n        <ng-template [ngTemplateOutlet]="labelTemplate"></ng-template>\n      }\n\n      <ng-content></ng-content>\n    </div>\n\n    @if (_hasTextSuffix) {\n      <div class="mat-mdc-form-field-text-suffix" #textSuffixContainer>\n        <ng-content select="[matTextSuffix]"></ng-content>\n      </div>\n    }\n\n    @if (_hasIconSuffix) {\n      <div class="mat-mdc-form-field-icon-suffix" #iconSuffixContainer>\n        <ng-content select="[matSuffix], [matIconSuffix]"></ng-content>\n      </div>\n    }\n  </div>\n\n  @if (!_hasOutline()) {\n    <div matFormFieldLineRipple></div>\n  }\n</div>\n\n<div\n    class="mat-mdc-form-field-subscript-wrapper mat-mdc-form-field-bottom-align"\n    [class.mat-mdc-form-field-subscript-dynamic-size]="subscriptSizing === \'dynamic\'"\n>\n  @let subscriptMessageType = _getSubscriptMessageType();\n\n  <!-- \n    Use a single permanent wrapper for both hints and errors so aria-live works correctly,\n    as having it appear post render will not consistently work. We also do not want to add\n    additional divs as it causes styling regressions.\n    -->\n  <div aria-atomic="true" aria-live="polite" \n      [class.mat-mdc-form-field-error-wrapper]="subscriptMessageType === \'error\'"\n      [class.mat-mdc-form-field-hint-wrapper]="subscriptMessageType === \'hint\'"\n    >\n    @switch (subscriptMessageType) {\n      @case (\'error\') {\n        <ng-content select="mat-error, [matError]"></ng-content>\n      }\n\n      @case (\'hint\') {\n        @if (hintLabel) {\n          <mat-hint [id]="_hintLabelId">{{hintLabel}}</mat-hint>\n        }\n        <ng-content select="mat-hint:not([align=\'end\'])"></ng-content>\n        <div class="mat-mdc-form-field-hint-spacer"></div>\n        <ng-content select="mat-hint[align=\'end\']"></ng-content>\n      }\n    }\n  </div>\n</div>\n',
      styles: ['.mdc-text-field{display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field__input{width:100%;min-width:0;border:none;border-radius:0;background:none;padding:0;-moz-appearance:none;-webkit-appearance:none;height:28px}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}.mdc-text-field__input::placeholder{opacity:0}.mdc-text-field__input::-moz-placeholder{opacity:0}.mdc-text-field__input::-webkit-input-placeholder{opacity:0}.mdc-text-field__input:-ms-input-placeholder{opacity:0}.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder,.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder{opacity:1}.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder,.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder{opacity:1}.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder{opacity:0}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder{opacity:0}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder{opacity:0}.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder{opacity:0}.mdc-text-field--outlined .mdc-text-field__input,.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-filled-text-field-input-text-color, var(--mat-sys-on-surface));caret-color:var(--mdc-filled-text-field-caret-color, var(--mat-sys-primary))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-error-caret-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-filled-text-field-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-outlined-text-field-input-text-color, var(--mat-sys-on-surface));caret-color:var(--mdc-outlined-text-field-caret-color, var(--mat-sys-primary))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-error-caret-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-outlined-text-field-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}@media(forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}}.mdc-text-field--filled{height:56px;border-bottom-right-radius:0;border-bottom-left-radius:0;border-top-left-radius:var(--mdc-filled-text-field-container-shape, var(--mat-sys-corner-extra-small));border-top-right-radius:var(--mdc-filled-text-field-container-shape, var(--mat-sys-corner-extra-small))}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mdc-filled-text-field-container-color, var(--mat-sys-surface-variant))}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mdc-filled-text-field-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent))}.mdc-text-field--outlined{height:56px;overflow:visible;padding-right:max(16px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)));padding-left:max(16px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)) + 4px)}[dir=rtl] .mdc-text-field--outlined{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)) + 4px);padding-left:max(16px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)))}.mdc-floating-label{position:absolute;left:0;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label{right:0;left:auto;transform-origin:right top;text-align:right}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:auto}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label{left:auto;right:4px}.mdc-text-field--filled .mdc-floating-label{left:16px;right:auto}[dir=rtl] .mdc-text-field--filled .mdc-floating-label{left:auto;right:16px}.mdc-text-field--disabled .mdc-floating-label{cursor:default}@media(forced-colors: active){.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label{color:var(--mdc-filled-text-field-label-text-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label{color:var(--mdc-filled-text-field-focus-label-text-color, var(--mat-sys-primary))}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label{color:var(--mdc-filled-text-field-hover-label-text-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label{color:var(--mdc-filled-text-field-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label{color:var(--mdc-filled-text-field-error-label-text-color, var(--mat-sys-error))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label{color:var(--mdc-filled-text-field-error-focus-label-text-color, var(--mat-sys-error))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label{color:var(--mdc-filled-text-field-error-hover-label-text-color, var(--mat-sys-on-error-container))}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mdc-filled-text-field-label-text-font, var(--mat-sys-body-large-font));font-size:var(--mdc-filled-text-field-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-filled-text-field-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-filled-text-field-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label{color:var(--mdc-outlined-text-field-label-text-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label{color:var(--mdc-outlined-text-field-focus-label-text-color, var(--mat-sys-primary))}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label{color:var(--mdc-outlined-text-field-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label{color:var(--mdc-outlined-text-field-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label{color:var(--mdc-outlined-text-field-error-label-text-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label{color:var(--mdc-outlined-text-field-error-focus-label-text-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label{color:var(--mdc-outlined-text-field-error-hover-label-text-color, var(--mat-sys-on-error-container))}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mdc-outlined-text-field-label-text-font, var(--mat-sys-body-large-font));font-size:var(--mdc-outlined-text-field-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mdc-outlined-text-field-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mdc-outlined-text-field-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-floating-label--float-above{cursor:auto;transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1);font-size:.75rem}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline{text-align:right}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mat-mdc-notch-piece{box-sizing:border-box;height:100%;pointer-events:none;border-top:1px solid;border-bottom:1px solid}.mdc-text-field--focused .mat-mdc-notch-piece{border-width:2px}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-outline-color, var(--mat-sys-outline));border-width:var(--mdc-outlined-text-field-outline-width, 1px)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-hover-outline-color, var(--mat-sys-on-surface))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-focus-outline-color, var(--mat-sys-primary))}.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-error-outline-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-error-hover-outline-color, var(--mat-sys-on-error-container))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece{border-color:var(--mdc-outlined-text-field-error-focus-outline-color, var(--mat-sys-error))}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece{border-width:var(--mdc-outlined-text-field-focus-outline-width, 2px)}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;border-top-left-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small));border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small))}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)))}[dir=rtl] .mdc-notched-outline__leading{border-left:none;border-right:1px solid;border-bottom-left-radius:0;border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small));border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small))}.mdc-notched-outline__trailing{flex-grow:1;border-left:none;border-right:1px solid;border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small));border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small))}[dir=rtl] .mdc-notched-outline__trailing{border-left:1px solid;border-right:none;border-top-right-radius:0;border-bottom-right-radius:0;border-top-left-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small));border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small))}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:min(var(--mat-form-field-notch-max-width, 100%),100% - max(12px,var(--mdc-outlined-text-field-container-shape, var(--mat-sys-corner-extra-small)))*2)}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none;--mat-form-field-notch-max-width: 100%}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{z-index:1;border-bottom-width:var(--mdc-filled-text-field-active-indicator-height, 1px)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-active-indicator-color, var(--mat-sys-on-surface-variant))}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-hover-active-indicator-color, var(--mat-sys-on-surface))}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-active-indicator-color, var(--mat-sys-error))}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-hover-active-indicator-color, var(--mat-sys-on-error-container))}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mdc-filled-text-field-focus-active-indicator-height, 2px)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-focus-active-indicator-color, var(--mat-sys-primary))}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-error-focus-active-indicator-color, var(--mat-sys-error))}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-text-field--disabled{pointer-events:none}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all;will-change:auto}.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label{cursor:inherit}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto;will-change:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:1px solid rgba(0,0,0,0)}[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:none;border-right:1px solid rgba(0,0,0,0)}.mat-mdc-form-field-infix{min-height:var(--mat-form-field-container-height, 56px);padding-top:var(--mat-form-field-filled-with-label-container-padding-top, 24px);padding-bottom:var(--mat-form-field-filled-with-label-container-padding-bottom, 8px)}.mdc-text-field--outlined .mat-mdc-form-field-infix,.mdc-text-field--no-label .mat-mdc-form-field-infix{padding-top:var(--mat-form-field-container-vertical-padding, 16px);padding-bottom:var(--mat-form-field-container-vertical-padding, 16px)}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:calc(var(--mat-form-field-container-height, 56px)/2)}.mdc-text-field--filled .mat-mdc-floating-label{display:var(--mat-form-field-filled-label-display, block)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1)) scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));transform:var(--mat-mdc-form-field-label-transform)}@keyframes _mat-form-field-subscript-animation{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px;opacity:1;transform:translateY(0);animation:_mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2)}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block;color:var(--mat-form-field-error-text-color, var(--mat-sys-error))}.mat-mdc-form-field-subscript-wrapper,.mat-mdc-form-field-bottom-align::before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));line-height:var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));font-size:var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));letter-spacing:var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));font-weight:var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight))}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none;background-color:var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface))}.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-focus-state-layer-opacity, 0)}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option{color:var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10))}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled{color:var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent))}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none;color:var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant))}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after{color:var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary))}.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after{color:var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}@media(forced-colors: active){.mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}}@media(forced-colors: active){.mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}}@media(forced-colors: active){.mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}}@media(forced-colors: active){.mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));line-height:var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));letter-spacing:var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));font-weight:var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size)*var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%;z-index:0}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:0 12px;box-sizing:content-box}.mat-mdc-form-field-icon-prefix{color:var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant))}.mat-form-field-disabled .mat-mdc-form-field-icon-prefix{color:var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant))}.mat-form-field-disabled .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-form-field-invalid .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error))}.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container))}.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix{color:var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error))}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field-infix:has(textarea[cols]){width:auto}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input{transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper{animation-duration:300ms}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}\n']
    }]
  }], () => [], {
    _textField: [{
      type: ViewChild,
      args: ["textField"]
    }],
    _iconPrefixContainer: [{
      type: ViewChild,
      args: ["iconPrefixContainer"]
    }],
    _textPrefixContainer: [{
      type: ViewChild,
      args: ["textPrefixContainer"]
    }],
    _iconSuffixContainer: [{
      type: ViewChild,
      args: ["iconSuffixContainer"]
    }],
    _textSuffixContainer: [{
      type: ViewChild,
      args: ["textSuffixContainer"]
    }],
    _floatingLabel: [{
      type: ViewChild,
      args: [MatFormFieldFloatingLabel]
    }],
    _notchedOutline: [{
      type: ViewChild,
      args: [MatFormFieldNotchedOutline]
    }],
    _lineRipple: [{
      type: ViewChild,
      args: [MatFormFieldLineRipple]
    }],
    _formFieldControl: [{
      type: ContentChild,
      args: [MatFormFieldControl]
    }],
    _prefixChildren: [{
      type: ContentChildren,
      args: [MAT_PREFIX, {
        descendants: true
      }]
    }],
    _suffixChildren: [{
      type: ContentChildren,
      args: [MAT_SUFFIX, {
        descendants: true
      }]
    }],
    _errorChildren: [{
      type: ContentChildren,
      args: [MAT_ERROR, {
        descendants: true
      }]
    }],
    _hintChildren: [{
      type: ContentChildren,
      args: [MatHint, {
        descendants: true
      }]
    }],
    hideRequiredMarker: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    floatLabel: [{
      type: Input
    }],
    appearance: [{
      type: Input
    }],
    subscriptSizing: [{
      type: Input
    }],
    hintLabel: [{
      type: Input
    }]
  });
})();

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/module-BXZhw7pQ.mjs
var MatFormFieldModule = class _MatFormFieldModule {
  static \u0275fac = function MatFormFieldModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatFormFieldModule,
    imports: [MatCommonModule, ObserversModule, MatFormField, MatLabel, MatError, MatHint, MatPrefix, MatSuffix],
    exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, ObserversModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, ObserversModule, MatFormField, MatLabel, MatError, MatHint, MatPrefix, MatSuffix],
      exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19.2.14_rxjs@7.8.2_zone.js@0_acf0b48f9f6c20839ed0337e05a1c5b6/node_modules/@angular/cdk/fesm2022/text-field.mjs
var _CdkTextFieldStyleLoader = class __CdkTextFieldStyleLoader {
  static \u0275fac = function _CdkTextFieldStyleLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __CdkTextFieldStyleLoader)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __CdkTextFieldStyleLoader,
    selectors: [["ng-component"]],
    hostAttrs: ["cdk-text-field-style-loader", ""],
    decls: 0,
    vars: 0,
    template: function _CdkTextFieldStyleLoader_Template(rf, ctx) {
    },
    styles: ["textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{padding:2px 0 !important;box-sizing:content-box !important;height:auto !important;overflow:hidden !important}textarea.cdk-textarea-autosize-measuring-firefox{padding:2px 0 !important;box-sizing:content-box !important;height:0 !important}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{animation:cdk-text-field-autofill-start 0s 1ms}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){animation:cdk-text-field-autofill-end 0s 1ms}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_CdkTextFieldStyleLoader, [{
    type: Component,
    args: [{
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      host: {
        "cdk-text-field-style-loader": ""
      },
      styles: ["textarea.cdk-textarea-autosize{resize:none}textarea.cdk-textarea-autosize-measuring{padding:2px 0 !important;box-sizing:content-box !important;height:auto !important;overflow:hidden !important}textarea.cdk-textarea-autosize-measuring-firefox{padding:2px 0 !important;box-sizing:content-box !important;height:0 !important}@keyframes cdk-text-field-autofill-start{/*!*/}@keyframes cdk-text-field-autofill-end{/*!*/}.cdk-text-field-autofill-monitored:-webkit-autofill{animation:cdk-text-field-autofill-start 0s 1ms}.cdk-text-field-autofill-monitored:not(:-webkit-autofill){animation:cdk-text-field-autofill-end 0s 1ms}\n"]
    }]
  }], null, null);
})();
var listenerOptions = {
  passive: true
};
var AutofillMonitor = class _AutofillMonitor {
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _styleLoader = inject(_CdkPrivateStyleLoader);
  _monitoredElements = /* @__PURE__ */ new Map();
  constructor() {
  }
  monitor(elementOrRef) {
    if (!this._platform.isBrowser) {
      return EMPTY;
    }
    this._styleLoader.load(_CdkTextFieldStyleLoader);
    const element = coerceElement(elementOrRef);
    const info = this._monitoredElements.get(element);
    if (info) {
      return info.subject;
    }
    const subject = new Subject();
    const cssClass = "cdk-text-field-autofilled";
    const listener = (event) => {
      if (event.animationName === "cdk-text-field-autofill-start" && !element.classList.contains(cssClass)) {
        element.classList.add(cssClass);
        this._ngZone.run(() => subject.next({
          target: event.target,
          isAutofilled: true
        }));
      } else if (event.animationName === "cdk-text-field-autofill-end" && element.classList.contains(cssClass)) {
        element.classList.remove(cssClass);
        this._ngZone.run(() => subject.next({
          target: event.target,
          isAutofilled: false
        }));
      }
    };
    const unlisten = this._ngZone.runOutsideAngular(() => {
      element.classList.add("cdk-text-field-autofill-monitored");
      return _bindEventWithOptions(this._renderer, element, "animationstart", listener, listenerOptions);
    });
    this._monitoredElements.set(element, {
      subject,
      unlisten
    });
    return subject;
  }
  stopMonitoring(elementOrRef) {
    const element = coerceElement(elementOrRef);
    const info = this._monitoredElements.get(element);
    if (info) {
      info.unlisten();
      info.subject.complete();
      element.classList.remove("cdk-text-field-autofill-monitored");
      element.classList.remove("cdk-text-field-autofilled");
      this._monitoredElements.delete(element);
    }
  }
  ngOnDestroy() {
    this._monitoredElements.forEach((_info, element) => this.stopMonitoring(element));
  }
  static \u0275fac = function AutofillMonitor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AutofillMonitor)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _AutofillMonitor,
    factory: _AutofillMonitor.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutofillMonitor, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CdkAutofill = class _CdkAutofill {
  _elementRef = inject(ElementRef);
  _autofillMonitor = inject(AutofillMonitor);
  /** Emits when the autofill state of the element changes. */
  cdkAutofill = new EventEmitter();
  constructor() {
  }
  ngOnInit() {
    this._autofillMonitor.monitor(this._elementRef).subscribe((event) => this.cdkAutofill.emit(event));
  }
  ngOnDestroy() {
    this._autofillMonitor.stopMonitoring(this._elementRef);
  }
  static \u0275fac = function CdkAutofill_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkAutofill)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkAutofill,
    selectors: [["", "cdkAutofill", ""]],
    outputs: {
      cdkAutofill: "cdkAutofill"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkAutofill, [{
    type: Directive,
    args: [{
      selector: "[cdkAutofill]"
    }]
  }], () => [], {
    cdkAutofill: [{
      type: Output
    }]
  });
})();
var CdkTextareaAutosize = class _CdkTextareaAutosize {
  _elementRef = inject(ElementRef);
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _renderer = inject(Renderer2);
  _resizeEvents = new Subject();
  /** Keep track of the previous textarea value to avoid resizing when the value hasn't changed. */
  _previousValue;
  _initialHeight;
  _destroyed = new Subject();
  _listenerCleanups;
  _minRows;
  _maxRows;
  _enabled = true;
  /**
   * Value of minRows as of last resize. If the minRows has decreased, the
   * height of the textarea needs to be recomputed to reflect the new minimum. The maxHeight
   * does not have the same problem because it does not affect the textarea's scrollHeight.
   */
  _previousMinRows = -1;
  _textareaElement;
  /** Minimum amount of rows in the textarea. */
  get minRows() {
    return this._minRows;
  }
  set minRows(value) {
    this._minRows = coerceNumberProperty(value);
    this._setMinHeight();
  }
  /** Maximum amount of rows in the textarea. */
  get maxRows() {
    return this._maxRows;
  }
  set maxRows(value) {
    this._maxRows = coerceNumberProperty(value);
    this._setMaxHeight();
  }
  /** Whether autosizing is enabled or not */
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    if (this._enabled !== value) {
      (this._enabled = value) ? this.resizeToFitContent(true) : this.reset();
    }
  }
  get placeholder() {
    return this._textareaElement.placeholder;
  }
  set placeholder(value) {
    this._cachedPlaceholderHeight = void 0;
    if (value) {
      this._textareaElement.setAttribute("placeholder", value);
    } else {
      this._textareaElement.removeAttribute("placeholder");
    }
    this._cacheTextareaPlaceholderHeight();
  }
  /** Cached height of a textarea with a single row. */
  _cachedLineHeight;
  /** Cached height of a textarea with only the placeholder. */
  _cachedPlaceholderHeight;
  /** Cached scroll top of a textarea */
  _cachedScrollTop;
  /** Used to reference correct document/window */
  _document = inject(DOCUMENT, {
    optional: true
  });
  _hasFocus;
  _isViewInited = false;
  constructor() {
    const styleLoader = inject(_CdkPrivateStyleLoader);
    styleLoader.load(_CdkTextFieldStyleLoader);
    this._textareaElement = this._elementRef.nativeElement;
  }
  /** Sets the minimum height of the textarea as determined by minRows. */
  _setMinHeight() {
    const minHeight = this.minRows && this._cachedLineHeight ? `${this.minRows * this._cachedLineHeight}px` : null;
    if (minHeight) {
      this._textareaElement.style.minHeight = minHeight;
    }
  }
  /** Sets the maximum height of the textarea as determined by maxRows. */
  _setMaxHeight() {
    const maxHeight = this.maxRows && this._cachedLineHeight ? `${this.maxRows * this._cachedLineHeight}px` : null;
    if (maxHeight) {
      this._textareaElement.style.maxHeight = maxHeight;
    }
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._initialHeight = this._textareaElement.style.height;
      this.resizeToFitContent();
      this._ngZone.runOutsideAngular(() => {
        this._listenerCleanups = [this._renderer.listen("window", "resize", () => this._resizeEvents.next()), this._renderer.listen(this._textareaElement, "focus", this._handleFocusEvent), this._renderer.listen(this._textareaElement, "blur", this._handleFocusEvent)];
        this._resizeEvents.pipe(auditTime(16)).subscribe(() => {
          this._cachedLineHeight = this._cachedPlaceholderHeight = void 0;
          this.resizeToFitContent(true);
        });
      });
      this._isViewInited = true;
      this.resizeToFitContent(true);
    }
  }
  ngOnDestroy() {
    this._listenerCleanups?.forEach((cleanup) => cleanup());
    this._resizeEvents.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /**
   * Cache the height of a single-row textarea if it has not already been cached.
   *
   * We need to know how large a single "row" of a textarea is in order to apply minRows and
   * maxRows. For the initial version, we will assume that the height of a single line in the
   * textarea does not ever change.
   */
  _cacheTextareaLineHeight() {
    if (this._cachedLineHeight) {
      return;
    }
    const textareaClone = this._textareaElement.cloneNode(false);
    const cloneStyles = textareaClone.style;
    textareaClone.rows = 1;
    cloneStyles.position = "absolute";
    cloneStyles.visibility = "hidden";
    cloneStyles.border = "none";
    cloneStyles.padding = "0";
    cloneStyles.height = "";
    cloneStyles.minHeight = "";
    cloneStyles.maxHeight = "";
    cloneStyles.top = cloneStyles.bottom = cloneStyles.left = cloneStyles.right = "auto";
    cloneStyles.overflow = "hidden";
    this._textareaElement.parentNode.appendChild(textareaClone);
    this._cachedLineHeight = textareaClone.clientHeight;
    textareaClone.remove();
    this._setMinHeight();
    this._setMaxHeight();
  }
  _measureScrollHeight() {
    const element = this._textareaElement;
    const previousMargin = element.style.marginBottom || "";
    const isFirefox = this._platform.FIREFOX;
    const needsMarginFiller = isFirefox && this._hasFocus;
    const measuringClass = isFirefox ? "cdk-textarea-autosize-measuring-firefox" : "cdk-textarea-autosize-measuring";
    if (needsMarginFiller) {
      element.style.marginBottom = `${element.clientHeight}px`;
    }
    element.classList.add(measuringClass);
    const scrollHeight = element.scrollHeight - 4;
    element.classList.remove(measuringClass);
    if (needsMarginFiller) {
      element.style.marginBottom = previousMargin;
    }
    return scrollHeight;
  }
  _cacheTextareaPlaceholderHeight() {
    if (!this._isViewInited || this._cachedPlaceholderHeight != void 0) {
      return;
    }
    if (!this.placeholder) {
      this._cachedPlaceholderHeight = 0;
      return;
    }
    const value = this._textareaElement.value;
    this._textareaElement.value = this._textareaElement.placeholder;
    this._cachedPlaceholderHeight = this._measureScrollHeight();
    this._textareaElement.value = value;
  }
  /** Handles `focus` and `blur` events. */
  _handleFocusEvent = (event) => {
    this._hasFocus = event.type === "focus";
  };
  ngDoCheck() {
    if (this._platform.isBrowser) {
      this.resizeToFitContent();
    }
  }
  /**
   * Resize the textarea to fit its content.
   * @param force Whether to force a height recalculation. By default the height will be
   *    recalculated only if the value changed since the last call.
   */
  resizeToFitContent(force = false) {
    if (!this._enabled) {
      return;
    }
    this._cacheTextareaLineHeight();
    this._cacheTextareaPlaceholderHeight();
    this._cachedScrollTop = this._textareaElement.scrollTop;
    if (!this._cachedLineHeight) {
      return;
    }
    const textarea = this._elementRef.nativeElement;
    const value = textarea.value;
    if (!force && this._minRows === this._previousMinRows && value === this._previousValue) {
      return;
    }
    const scrollHeight = this._measureScrollHeight();
    const height = Math.max(scrollHeight, this._cachedPlaceholderHeight || 0);
    textarea.style.height = `${height}px`;
    this._ngZone.runOutsideAngular(() => {
      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(() => this._scrollToCaretPosition(textarea));
      } else {
        setTimeout(() => this._scrollToCaretPosition(textarea));
      }
    });
    this._previousValue = value;
    this._previousMinRows = this._minRows;
  }
  /**
   * Resets the textarea to its original size
   */
  reset() {
    if (this._initialHeight !== void 0) {
      this._textareaElement.style.height = this._initialHeight;
    }
  }
  _noopInputHandler() {
  }
  /**
   * Scrolls a textarea to the caret position. On Firefox resizing the textarea will
   * prevent it from scrolling to the caret position. We need to re-set the selection
   * in order for it to scroll to the proper position.
   */
  _scrollToCaretPosition(textarea) {
    const {
      selectionStart,
      selectionEnd
    } = textarea;
    if (!this._destroyed.isStopped && this._hasFocus) {
      textarea.setSelectionRange(selectionStart, selectionEnd);
      textarea.scrollTop = this._cachedScrollTop;
    }
  }
  static \u0275fac = function CdkTextareaAutosize_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkTextareaAutosize)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _CdkTextareaAutosize,
    selectors: [["textarea", "cdkTextareaAutosize", ""]],
    hostAttrs: ["rows", "1", 1, "cdk-textarea-autosize"],
    hostBindings: function CdkTextareaAutosize_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("input", function CdkTextareaAutosize_input_HostBindingHandler() {
          return ctx._noopInputHandler();
        });
      }
    },
    inputs: {
      minRows: [0, "cdkAutosizeMinRows", "minRows"],
      maxRows: [0, "cdkAutosizeMaxRows", "maxRows"],
      enabled: [2, "cdkTextareaAutosize", "enabled", booleanAttribute],
      placeholder: "placeholder"
    },
    exportAs: ["cdkTextareaAutosize"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkTextareaAutosize, [{
    type: Directive,
    args: [{
      selector: "textarea[cdkTextareaAutosize]",
      exportAs: "cdkTextareaAutosize",
      host: {
        "class": "cdk-textarea-autosize",
        // Textarea elements that have the directive applied should have a single row by default.
        // Browsers normally show two rows by default and therefore this limits the minRows binding.
        "rows": "1",
        "(input)": "_noopInputHandler()"
      }
    }]
  }], () => [], {
    minRows: [{
      type: Input,
      args: ["cdkAutosizeMinRows"]
    }],
    maxRows: [{
      type: Input,
      args: ["cdkAutosizeMaxRows"]
    }],
    enabled: [{
      type: Input,
      args: [{
        alias: "cdkTextareaAutosize",
        transform: booleanAttribute
      }]
    }],
    placeholder: [{
      type: Input
    }]
  });
})();
var TextFieldModule = class _TextFieldModule {
  static \u0275fac = function TextFieldModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TextFieldModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _TextFieldModule,
    imports: [CdkAutofill, CdkTextareaAutosize],
    exports: [CdkAutofill, CdkTextareaAutosize]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextFieldModule, [{
    type: NgModule,
    args: [{
      imports: [CdkAutofill, CdkTextareaAutosize],
      exports: [CdkAutofill, CdkTextareaAutosize]
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/input-value-accessor-D1GvPuqO.mjs
var MAT_INPUT_VALUE_ACCESSOR = new InjectionToken("MAT_INPUT_VALUE_ACCESSOR");

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/error-options-Dm2JJUbF.mjs
var ShowOnDirtyErrorStateMatcher = class _ShowOnDirtyErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.dirty || form && form.submitted));
  }
  static \u0275fac = function ShowOnDirtyErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ShowOnDirtyErrorStateMatcher)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ShowOnDirtyErrorStateMatcher,
    factory: _ShowOnDirtyErrorStateMatcher.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShowOnDirtyErrorStateMatcher, [{
    type: Injectable
  }], null, null);
})();
var ErrorStateMatcher = class _ErrorStateMatcher {
  isErrorState(control, form) {
    return !!(control && control.invalid && (control.touched || form && form.submitted));
  }
  static \u0275fac = function ErrorStateMatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ErrorStateMatcher)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ErrorStateMatcher,
    factory: _ErrorStateMatcher.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorStateMatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/error-state-Dtb1IHM-.mjs
var _ErrorStateTracker = class {
  _defaultMatcher;
  ngControl;
  _parentFormGroup;
  _parentForm;
  _stateChanges;
  /** Whether the tracker is currently in an error state. */
  errorState = false;
  /** User-defined matcher for the error state. */
  matcher;
  constructor(_defaultMatcher, ngControl, _parentFormGroup, _parentForm, _stateChanges) {
    this._defaultMatcher = _defaultMatcher;
    this.ngControl = ngControl;
    this._parentFormGroup = _parentFormGroup;
    this._parentForm = _parentForm;
    this._stateChanges = _stateChanges;
  }
  /** Updates the error state based on the provided error state matcher. */
  updateErrorState() {
    const oldState = this.errorState;
    const parent = this._parentFormGroup || this._parentForm;
    const matcher = this.matcher || this._defaultMatcher;
    const control = this.ngControl ? this.ngControl.control : null;
    const newState = matcher?.isErrorState(control, parent) ?? false;
    if (newState !== oldState) {
      this.errorState = newState;
      this._stateChanges.next();
    }
  }
};

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/input.mjs
function getMatInputUnsupportedTypeError(type) {
  return Error(`Input type "${type}" isn't supported by matInput.`);
}
var MAT_INPUT_INVALID_TYPES = ["button", "checkbox", "file", "hidden", "image", "radio", "range", "reset", "submit"];
var MAT_INPUT_CONFIG = new InjectionToken("MAT_INPUT_CONFIG");
var MatInput = class _MatInput {
  _elementRef = inject(ElementRef);
  _platform = inject(Platform);
  ngControl = inject(NgControl, {
    optional: true,
    self: true
  });
  _autofillMonitor = inject(AutofillMonitor);
  _ngZone = inject(NgZone);
  _formField = inject(MAT_FORM_FIELD, {
    optional: true
  });
  _renderer = inject(Renderer2);
  _uid = inject(_IdGenerator).getId("mat-input-");
  _previousNativeValue;
  _inputValueAccessor;
  _signalBasedValueAccessor;
  _previousPlaceholder;
  _errorStateTracker;
  _config = inject(MAT_INPUT_CONFIG, {
    optional: true
  });
  _cleanupIosKeyup;
  _cleanupWebkitWheel;
  /** `aria-describedby` IDs assigned by the form field. */
  _formFieldDescribedBy;
  /** Whether the component is being rendered on the server. */
  _isServer;
  /** Whether the component is a native html select. */
  _isNativeSelect;
  /** Whether the component is a textarea. */
  _isTextarea;
  /** Whether the input is inside of a form field. */
  _isInFormField;
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  focused = false;
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  stateChanges = new Subject();
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  controlType = "mat-input";
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  autofilled = false;
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }
  _disabled = false;
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value || this._uid;
  }
  _id;
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  placeholder;
  /**
   * Name of the input.
   * @docs-private
   */
  name;
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get required() {
    return this._required ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }
  set required(value) {
    this._required = coerceBooleanProperty(value);
  }
  _required;
  /** Input type of the element. */
  get type() {
    return this._type;
  }
  set type(value) {
    const prevType = this._type;
    this._type = value || "text";
    this._validateType();
    if (!this._isTextarea && getSupportedInputTypes().has(this._type)) {
      this._elementRef.nativeElement.type = this._type;
    }
    if (this._type !== prevType) {
      this._ensureWheelDefaultBehavior();
    }
  }
  _type = "text";
  /** An object used to control when error messages are shown. */
  get errorStateMatcher() {
    return this._errorStateTracker.matcher;
  }
  set errorStateMatcher(value) {
    this._errorStateTracker.matcher = value;
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  userAriaDescribedBy;
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get value() {
    return this._signalBasedValueAccessor ? this._signalBasedValueAccessor.value() : this._inputValueAccessor.value;
  }
  set value(value) {
    if (value !== this.value) {
      if (this._signalBasedValueAccessor) {
        this._signalBasedValueAccessor.value.set(value);
      } else {
        this._inputValueAccessor.value = value;
      }
      this.stateChanges.next();
    }
  }
  /** Whether the element is readonly. */
  get readonly() {
    return this._readonly;
  }
  set readonly(value) {
    this._readonly = coerceBooleanProperty(value);
  }
  _readonly = false;
  /** Whether the input should remain interactive when it is disabled. */
  disabledInteractive;
  /** Whether the input is in an error state. */
  get errorState() {
    return this._errorStateTracker.errorState;
  }
  set errorState(value) {
    this._errorStateTracker.errorState = value;
  }
  _neverEmptyInputTypes = ["date", "datetime", "datetime-local", "month", "time", "week"].filter((t) => getSupportedInputTypes().has(t));
  constructor() {
    const parentForm = inject(NgForm, {
      optional: true
    });
    const parentFormGroup = inject(FormGroupDirective, {
      optional: true
    });
    const defaultErrorStateMatcher = inject(ErrorStateMatcher);
    const accessor = inject(MAT_INPUT_VALUE_ACCESSOR, {
      optional: true,
      self: true
    });
    const element = this._elementRef.nativeElement;
    const nodeName = element.nodeName.toLowerCase();
    if (accessor) {
      if (isSignal(accessor.value)) {
        this._signalBasedValueAccessor = accessor;
      } else {
        this._inputValueAccessor = accessor;
      }
    } else {
      this._inputValueAccessor = element;
    }
    this._previousNativeValue = this.value;
    this.id = this.id;
    if (this._platform.IOS) {
      this._ngZone.runOutsideAngular(() => {
        this._cleanupIosKeyup = this._renderer.listen(element, "keyup", this._iOSKeyupListener);
      });
    }
    this._errorStateTracker = new _ErrorStateTracker(defaultErrorStateMatcher, this.ngControl, parentFormGroup, parentForm, this.stateChanges);
    this._isServer = !this._platform.isBrowser;
    this._isNativeSelect = nodeName === "select";
    this._isTextarea = nodeName === "textarea";
    this._isInFormField = !!this._formField;
    this.disabledInteractive = this._config?.disabledInteractive || false;
    if (this._isNativeSelect) {
      this.controlType = element.multiple ? "mat-native-select-multiple" : "mat-native-select";
    }
    if (this._signalBasedValueAccessor) {
      effect(() => {
        this._signalBasedValueAccessor.value();
        this.stateChanges.next();
      });
    }
  }
  ngAfterViewInit() {
    if (this._platform.isBrowser) {
      this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe((event) => {
        this.autofilled = event.isAutofilled;
        this.stateChanges.next();
      });
    }
  }
  ngOnChanges() {
    this.stateChanges.next();
  }
  ngOnDestroy() {
    this.stateChanges.complete();
    if (this._platform.isBrowser) {
      this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
    this._cleanupIosKeyup?.();
    this._cleanupWebkitWheel?.();
  }
  ngDoCheck() {
    if (this.ngControl) {
      this.updateErrorState();
      if (this.ngControl.disabled !== null && this.ngControl.disabled !== this.disabled) {
        this.disabled = this.ngControl.disabled;
        this.stateChanges.next();
      }
    }
    this._dirtyCheckNativeValue();
    this._dirtyCheckPlaceholder();
  }
  /** Focuses the input. */
  focus(options) {
    this._elementRef.nativeElement.focus(options);
  }
  /** Refreshes the error state of the input. */
  updateErrorState() {
    this._errorStateTracker.updateErrorState();
  }
  /** Callback for the cases where the focused state of the input changes. */
  _focusChanged(isFocused) {
    if (isFocused === this.focused) {
      return;
    }
    if (!this._isNativeSelect && isFocused && this.disabled && this.disabledInteractive) {
      const element = this._elementRef.nativeElement;
      if (element.type === "number") {
        element.type = "text";
        element.setSelectionRange(0, 0);
        element.type = "number";
      } else {
        element.setSelectionRange(0, 0);
      }
    }
    this.focused = isFocused;
    this.stateChanges.next();
  }
  _onInput() {
  }
  /** Does some manual dirty checking on the native input `value` property. */
  _dirtyCheckNativeValue() {
    const newValue = this._elementRef.nativeElement.value;
    if (this._previousNativeValue !== newValue) {
      this._previousNativeValue = newValue;
      this.stateChanges.next();
    }
  }
  /** Does some manual dirty checking on the native input `placeholder` attribute. */
  _dirtyCheckPlaceholder() {
    const placeholder = this._getPlaceholder();
    if (placeholder !== this._previousPlaceholder) {
      const element = this._elementRef.nativeElement;
      this._previousPlaceholder = placeholder;
      placeholder ? element.setAttribute("placeholder", placeholder) : element.removeAttribute("placeholder");
    }
  }
  /** Gets the current placeholder of the form field. */
  _getPlaceholder() {
    return this.placeholder || null;
  }
  /** Make sure the input is a supported type. */
  _validateType() {
    if (MAT_INPUT_INVALID_TYPES.indexOf(this._type) > -1 && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw getMatInputUnsupportedTypeError(this._type);
    }
  }
  /** Checks whether the input type is one of the types that are never empty. */
  _isNeverEmpty() {
    return this._neverEmptyInputTypes.indexOf(this._type) > -1;
  }
  /** Checks whether the input is invalid based on the native validation. */
  _isBadInput() {
    let validity = this._elementRef.nativeElement.validity;
    return validity && validity.badInput;
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get empty() {
    return !this._isNeverEmpty() && !this._elementRef.nativeElement.value && !this._isBadInput() && !this.autofilled;
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  get shouldLabelFloat() {
    if (this._isNativeSelect) {
      const selectElement = this._elementRef.nativeElement;
      const firstOption = selectElement.options[0];
      return this.focused || selectElement.multiple || !this.empty || !!(selectElement.selectedIndex > -1 && firstOption && firstOption.label);
    } else {
      return this.focused && !this.disabled || !this.empty;
    }
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  setDescribedByIds(ids) {
    const element = this._elementRef.nativeElement;
    const existingDescribedBy = element.getAttribute("aria-describedby");
    let toAssign;
    if (existingDescribedBy) {
      const exclude = this._formFieldDescribedBy || ids;
      toAssign = ids.concat(existingDescribedBy.split(" ").filter((id) => id && !exclude.includes(id)));
    } else {
      toAssign = ids;
    }
    this._formFieldDescribedBy = ids;
    if (toAssign.length) {
      element.setAttribute("aria-describedby", toAssign.join(" "));
    } else {
      element.removeAttribute("aria-describedby");
    }
  }
  /**
   * Implemented as part of MatFormFieldControl.
   * @docs-private
   */
  onContainerClick() {
    if (!this.focused) {
      this.focus();
    }
  }
  /** Whether the form control is a native select that is displayed inline. */
  _isInlineSelect() {
    const element = this._elementRef.nativeElement;
    return this._isNativeSelect && (element.multiple || element.size > 1);
  }
  _iOSKeyupListener = (event) => {
    const el = event.target;
    if (!el.value && el.selectionStart === 0 && el.selectionEnd === 0) {
      el.setSelectionRange(1, 1);
      el.setSelectionRange(0, 0);
    }
  };
  _webkitBlinkWheelListener = () => {
  };
  /**
   * In blink and webkit browsers a focused number input does not increment or decrement its value
   * on mouse wheel interaction unless a wheel event listener is attached to it or one of its
   * ancestors or a passive wheel listener is attached somewhere in the DOM. For example: Hitting
   * a tooltip once enables the mouse wheel input for all number inputs as long as it exists. In
   * order to get reliable and intuitive behavior we apply a wheel event on our own thus making
   * sure increment and decrement by mouse wheel works every time.
   * @docs-private
   */
  _ensureWheelDefaultBehavior() {
    this._cleanupWebkitWheel?.();
    if (this._type === "number" && (this._platform.BLINK || this._platform.WEBKIT)) {
      this._cleanupWebkitWheel = this._renderer.listen(this._elementRef.nativeElement, "wheel", this._webkitBlinkWheelListener);
    }
  }
  /** Gets the value to set on the `readonly` attribute. */
  _getReadonlyAttribute() {
    if (this._isNativeSelect) {
      return null;
    }
    if (this.readonly || this.disabled && this.disabledInteractive) {
      return "true";
    }
    return null;
  }
  static \u0275fac = function MatInput_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatInput)();
  };
  static \u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
    type: _MatInput,
    selectors: [["input", "matInput", ""], ["textarea", "matInput", ""], ["select", "matNativeControl", ""], ["input", "matNativeControl", ""], ["textarea", "matNativeControl", ""]],
    hostAttrs: [1, "mat-mdc-input-element"],
    hostVars: 21,
    hostBindings: function MatInput_HostBindings(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275listener("focus", function MatInput_focus_HostBindingHandler() {
          return ctx._focusChanged(true);
        })("blur", function MatInput_blur_HostBindingHandler() {
          return ctx._focusChanged(false);
        })("input", function MatInput_input_HostBindingHandler() {
          return ctx._onInput();
        });
      }
      if (rf & 2) {
        \u0275\u0275hostProperty("id", ctx.id)("disabled", ctx.disabled && !ctx.disabledInteractive)("required", ctx.required);
        \u0275\u0275attribute("name", ctx.name || null)("readonly", ctx._getReadonlyAttribute())("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null)("aria-invalid", ctx.empty && ctx.required ? null : ctx.errorState)("aria-required", ctx.required)("id", ctx.id);
        \u0275\u0275classProp("mat-input-server", ctx._isServer)("mat-mdc-form-field-textarea-control", ctx._isInFormField && ctx._isTextarea)("mat-mdc-form-field-input-control", ctx._isInFormField)("mat-mdc-input-disabled-interactive", ctx.disabledInteractive)("mdc-text-field__input", ctx._isInFormField)("mat-mdc-native-select-inline", ctx._isInlineSelect());
      }
    },
    inputs: {
      disabled: "disabled",
      id: "id",
      placeholder: "placeholder",
      name: "name",
      required: "required",
      type: "type",
      errorStateMatcher: "errorStateMatcher",
      userAriaDescribedBy: [0, "aria-describedby", "userAriaDescribedBy"],
      value: "value",
      readonly: "readonly",
      disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
    },
    exportAs: ["matInput"],
    features: [\u0275\u0275ProvidersFeature([{
      provide: MatFormFieldControl,
      useExisting: _MatInput
    }]), \u0275\u0275NgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatInput, [{
    type: Directive,
    args: [{
      selector: `input[matInput], textarea[matInput], select[matNativeControl],
      input[matNativeControl], textarea[matNativeControl]`,
      exportAs: "matInput",
      host: {
        "class": "mat-mdc-input-element",
        // The BaseMatInput parent class adds `mat-input-element`, `mat-form-field-control` and
        // `mat-form-field-autofill-control` to the CSS class list, but this should not be added for
        // this MDC equivalent input.
        "[class.mat-input-server]": "_isServer",
        "[class.mat-mdc-form-field-textarea-control]": "_isInFormField && _isTextarea",
        "[class.mat-mdc-form-field-input-control]": "_isInFormField",
        "[class.mat-mdc-input-disabled-interactive]": "disabledInteractive",
        "[class.mdc-text-field__input]": "_isInFormField",
        "[class.mat-mdc-native-select-inline]": "_isInlineSelect()",
        // Native input properties that are overwritten by Angular inputs need to be synced with
        // the native input element. Otherwise property bindings for those don't work.
        "[id]": "id",
        "[disabled]": "disabled && !disabledInteractive",
        "[required]": "required",
        "[attr.name]": "name || null",
        "[attr.readonly]": "_getReadonlyAttribute()",
        "[attr.aria-disabled]": 'disabled && disabledInteractive ? "true" : null',
        // Only mark the input as invalid for assistive technology if it has a value since the
        // state usually overlaps with `aria-required` when the input is empty and can be redundant.
        "[attr.aria-invalid]": "(empty && required) ? null : errorState",
        "[attr.aria-required]": "required",
        // Native input properties that are overwritten by Angular inputs need to be synced with
        // the native input element. Otherwise property bindings for those don't work.
        "[attr.id]": "id",
        "(focus)": "_focusChanged(true)",
        "(blur)": "_focusChanged(false)",
        "(input)": "_onInput()"
      },
      providers: [{
        provide: MatFormFieldControl,
        useExisting: MatInput
      }]
    }]
  }], () => [], {
    disabled: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    required: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    errorStateMatcher: [{
      type: Input
    }],
    userAriaDescribedBy: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    value: [{
      type: Input
    }],
    readonly: [{
      type: Input
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatInputModule = class _MatInputModule {
  static \u0275fac = function MatInputModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatInputModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatInputModule,
    imports: [MatCommonModule, MatFormFieldModule, MatInput],
    exports: [MatInput, MatFormFieldModule, TextFieldModule, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, MatFormFieldModule, MatFormFieldModule, TextFieldModule, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatInputModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatFormFieldModule, MatInput],
      exports: [MatInput, MatFormFieldModule, TextFieldModule, MatCommonModule]
    }]
  }], null, null);
})();

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/progress-spinner.mjs
var _c03 = ["determinateSpinner"];
function MatProgressSpinner_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 11);
    \u0275\u0275element(1, "circle", 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275attribute("viewBox", ctx_r0._viewBox());
    \u0275\u0275advance();
    \u0275\u0275styleProp("stroke-dasharray", ctx_r0._strokeCircumference(), "px")("stroke-dashoffset", ctx_r0._strokeCircumference() / 2, "px")("stroke-width", ctx_r0._circleStrokeWidth(), "%");
    \u0275\u0275attribute("r", ctx_r0._circleRadius());
  }
}
var MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = new InjectionToken("mat-progress-spinner-default-options", {
  providedIn: "root",
  factory: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY
});
function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY() {
  return {
    diameter: BASE_SIZE
  };
}
var BASE_SIZE = 100;
var BASE_STROKE_WIDTH = 10;
var MatProgressSpinner = class _MatProgressSpinner {
  _elementRef = inject(ElementRef);
  /** Whether the _mat-animation-noopable class should be applied, disabling animations.  */
  _noopAnimations;
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the progress spinner. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/progress-spinner/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  _color;
  _defaultColor = "primary";
  /** The element of the determinate spinner. */
  _determinateCircle;
  constructor() {
    const animationMode = inject(ANIMATION_MODULE_TYPE, {
      optional: true
    });
    const defaults = inject(MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS);
    this._noopAnimations = animationMode === "NoopAnimations" && !!defaults && !defaults._forceAnimations;
    this.mode = this._elementRef.nativeElement.nodeName.toLowerCase() === "mat-spinner" ? "indeterminate" : "determinate";
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      if (defaults.diameter) {
        this.diameter = defaults.diameter;
      }
      if (defaults.strokeWidth) {
        this.strokeWidth = defaults.strokeWidth;
      }
    }
  }
  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  mode;
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this.mode === "determinate" ? this._value : 0;
  }
  set value(v) {
    this._value = Math.max(0, Math.min(100, v || 0));
  }
  _value = 0;
  /** The diameter of the progress spinner (will set width and height of svg). */
  get diameter() {
    return this._diameter;
  }
  set diameter(size) {
    this._diameter = size || 0;
  }
  _diameter = BASE_SIZE;
  /** Stroke width of the progress spinner. */
  get strokeWidth() {
    return this._strokeWidth ?? this.diameter / 10;
  }
  set strokeWidth(value) {
    this._strokeWidth = value || 0;
  }
  _strokeWidth;
  /** The radius of the spinner, adjusted for stroke width. */
  _circleRadius() {
    return (this.diameter - BASE_STROKE_WIDTH) / 2;
  }
  /** The view box of the spinner's svg element. */
  _viewBox() {
    const viewBox = this._circleRadius() * 2 + this.strokeWidth;
    return `0 0 ${viewBox} ${viewBox}`;
  }
  /** The stroke circumference of the svg circle. */
  _strokeCircumference() {
    return 2 * Math.PI * this._circleRadius();
  }
  /** The dash offset of the svg circle. */
  _strokeDashOffset() {
    if (this.mode === "determinate") {
      return this._strokeCircumference() * (100 - this._value) / 100;
    }
    return null;
  }
  /** Stroke width of the circle in percent. */
  _circleStrokeWidth() {
    return this.strokeWidth / this.diameter * 100;
  }
  static \u0275fac = function MatProgressSpinner_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressSpinner)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatProgressSpinner,
    selectors: [["mat-progress-spinner"], ["mat-spinner"]],
    viewQuery: function MatProgressSpinner_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c03, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._determinateCircle = _t.first);
      }
    },
    hostAttrs: ["role", "progressbar", "tabindex", "-1", 1, "mat-mdc-progress-spinner", "mdc-circular-progress"],
    hostVars: 18,
    hostBindings: function MatProgressSpinner_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-valuemin", 0)("aria-valuemax", 100)("aria-valuenow", ctx.mode === "determinate" ? ctx.value : null)("mode", ctx.mode);
        \u0275\u0275classMap("mat-" + ctx.color);
        \u0275\u0275styleProp("width", ctx.diameter, "px")("height", ctx.diameter, "px")("--mdc-circular-progress-size", ctx.diameter + "px")("--mdc-circular-progress-active-indicator-width", ctx.diameter + "px");
        \u0275\u0275classProp("_mat-animation-noopable", ctx._noopAnimations)("mdc-circular-progress--indeterminate", ctx.mode === "indeterminate");
      }
    },
    inputs: {
      color: "color",
      mode: "mode",
      value: [2, "value", "value", numberAttribute],
      diameter: [2, "diameter", "diameter", numberAttribute],
      strokeWidth: [2, "strokeWidth", "strokeWidth", numberAttribute]
    },
    exportAs: ["matProgressSpinner"],
    decls: 14,
    vars: 11,
    consts: [["circle", ""], ["determinateSpinner", ""], ["aria-hidden", "true", 1, "mdc-circular-progress__determinate-container"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__determinate-circle-graphic"], ["cx", "50%", "cy", "50%", 1, "mdc-circular-progress__determinate-circle"], ["aria-hidden", "true", 1, "mdc-circular-progress__indeterminate-container"], [1, "mdc-circular-progress__spinner-layer"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-left"], [3, "ngTemplateOutlet"], [1, "mdc-circular-progress__gap-patch"], [1, "mdc-circular-progress__circle-clipper", "mdc-circular-progress__circle-right"], ["xmlns", "http://www.w3.org/2000/svg", "focusable", "false", 1, "mdc-circular-progress__indeterminate-circle-graphic"], ["cx", "50%", "cy", "50%"]],
    template: function MatProgressSpinner_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, MatProgressSpinner_ng_template_0_Template, 2, 8, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        \u0275\u0275elementStart(2, "div", 2, 1);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 3);
        \u0275\u0275element(5, "circle", 4);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "div", 5)(7, "div", 6)(8, "div", 7);
        \u0275\u0275elementContainer(9, 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 9);
        \u0275\u0275elementContainer(11, 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 10);
        \u0275\u0275elementContainer(13, 8);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        const circle_r2 = \u0275\u0275reference(1);
        \u0275\u0275advance(4);
        \u0275\u0275attribute("viewBox", ctx._viewBox());
        \u0275\u0275advance();
        \u0275\u0275styleProp("stroke-dasharray", ctx._strokeCircumference(), "px")("stroke-dashoffset", ctx._strokeDashOffset(), "px")("stroke-width", ctx._circleStrokeWidth(), "%");
        \u0275\u0275attribute("r", ctx._circleRadius());
        \u0275\u0275advance(4);
        \u0275\u0275property("ngTemplateOutlet", circle_r2);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngTemplateOutlet", circle_r2);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngTemplateOutlet", circle_r2);
      }
    },
    dependencies: [NgTemplateOutlet],
    styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width, 4px)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-sys-primary))}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressSpinner, [{
    type: Component,
    args: [{
      selector: "mat-progress-spinner, mat-spinner",
      exportAs: "matProgressSpinner",
      host: {
        "role": "progressbar",
        "class": "mat-mdc-progress-spinner mdc-circular-progress",
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        "tabindex": "-1",
        "[class]": '"mat-" + color',
        "[class._mat-animation-noopable]": `_noopAnimations`,
        "[class.mdc-circular-progress--indeterminate]": 'mode === "indeterminate"',
        "[style.width.px]": "diameter",
        "[style.height.px]": "diameter",
        "[style.--mdc-circular-progress-size]": 'diameter + "px"',
        "[style.--mdc-circular-progress-active-indicator-width]": 'diameter + "px"',
        "[attr.aria-valuemin]": "0",
        "[attr.aria-valuemax]": "100",
        "[attr.aria-valuenow]": 'mode === "determinate" ? value : null',
        "[attr.mode]": "mode"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [NgTemplateOutlet],
      template: '<ng-template #circle>\n  <svg [attr.viewBox]="_viewBox()" class="mdc-circular-progress__indeterminate-circle-graphic"\n       xmlns="http://www.w3.org/2000/svg" focusable="false">\n    <circle [attr.r]="_circleRadius()"\n            [style.stroke-dasharray.px]="_strokeCircumference()"\n            [style.stroke-dashoffset.px]="_strokeCircumference() / 2"\n            [style.stroke-width.%]="_circleStrokeWidth()"\n            cx="50%" cy="50%"/>\n  </svg>\n</ng-template>\n\n<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div class="mdc-circular-progress__determinate-container" aria-hidden="true" #determinateSpinner>\n  <svg [attr.viewBox]="_viewBox()" class="mdc-circular-progress__determinate-circle-graphic"\n       xmlns="http://www.w3.org/2000/svg" focusable="false">\n    <circle [attr.r]="_circleRadius()"\n            [style.stroke-dasharray.px]="_strokeCircumference()"\n            [style.stroke-dashoffset.px]="_strokeDashOffset()"\n            [style.stroke-width.%]="_circleStrokeWidth()"\n            class="mdc-circular-progress__determinate-circle"\n            cx="50%" cy="50%"/>\n  </svg>\n</div>\n<!--TODO: figure out why there are 3 separate svgs-->\n<div class="mdc-circular-progress__indeterminate-container" aria-hidden="true">\n  <div class="mdc-circular-progress__spinner-layer">\n    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n    <div class="mdc-circular-progress__gap-patch">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n    <div class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right">\n      <ng-container [ngTemplateOutlet]="circle"></ng-container>\n    </div>\n  </div>\n</div>\n',
      styles: [".mat-mdc-progress-spinner{display:block;overflow:hidden;line-height:0;position:relative;direction:ltr;transition:opacity 250ms cubic-bezier(0.4, 0, 0.6, 1)}.mat-mdc-progress-spinner circle{stroke-width:var(--mdc-circular-progress-active-indicator-width, 4px)}.mat-mdc-progress-spinner._mat-animation-noopable,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle{transition:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container{animation:none !important}.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle{stroke-dasharray:0 !important}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle{stroke:currentColor;stroke:CanvasText}}.mdc-circular-progress__determinate-container,.mdc-circular-progress__indeterminate-circle-graphic,.mdc-circular-progress__indeterminate-container,.mdc-circular-progress__spinner-layer{position:absolute;width:100%;height:100%}.mdc-circular-progress__determinate-container{transform:rotate(-90deg)}.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container{opacity:0}.mdc-circular-progress__indeterminate-container{font-size:0;letter-spacing:0;white-space:nowrap;opacity:0}.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container{opacity:1;animation:mdc-circular-progress-container-rotate 1568.2352941176ms linear infinite}.mdc-circular-progress__determinate-circle-graphic,.mdc-circular-progress__indeterminate-circle-graphic{fill:rgba(0,0,0,0)}.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:var(--mdc-circular-progress-active-indicator-color, var(--mat-sys-primary))}@media(forced-colors: active){.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic{stroke:CanvasText}}.mdc-circular-progress__determinate-circle{transition:stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1)}.mdc-circular-progress__gap-patch{position:absolute;top:0;left:47.5%;box-sizing:border-box;width:5%;height:100%;overflow:hidden}.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic{left:-900%;width:2000%;transform:rotate(180deg)}.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic{width:200%}.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{left:-100%}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic{animation:mdc-circular-progress-right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.mdc-circular-progress__circle-clipper{display:inline-flex;position:relative;width:50%;height:100%;overflow:hidden}.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer{animation:mdc-circular-progress-spinner-layer-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@keyframes mdc-circular-progress-container-rotate{to{transform:rotate(360deg)}}@keyframes mdc-circular-progress-spinner-layer-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}100%{transform:rotate(1080deg)}}@keyframes mdc-circular-progress-left-spin{from{transform:rotate(265deg)}50%{transform:rotate(130deg)}to{transform:rotate(265deg)}}@keyframes mdc-circular-progress-right-spin{from{transform:rotate(-265deg)}50%{transform:rotate(-130deg)}to{transform:rotate(-265deg)}}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    _determinateCircle: [{
      type: ViewChild,
      args: ["determinateSpinner"]
    }],
    mode: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    diameter: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    strokeWidth: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }]
  });
})();
var MatSpinner = MatProgressSpinner;
var MatProgressSpinnerModule = class _MatProgressSpinnerModule {
  static \u0275fac = function MatProgressSpinnerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressSpinnerModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatProgressSpinnerModule,
    imports: [MatProgressSpinner, MatSpinner],
    exports: [MatProgressSpinner, MatSpinner, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressSpinnerModule, [{
    type: NgModule,
    args: [{
      imports: [MatProgressSpinner, MatSpinner],
      exports: [MatProgressSpinner, MatSpinner, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/core/components/loading/loading.component.ts
function LoadingComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275element(2, "mat-spinner", 3);
    \u0275\u0275elementStart(3, "p", 4);
    \u0275\u0275text(4, "Procesando...");
    \u0275\u0275elementEnd()()();
  }
}
var LoadingComponent = class _LoadingComponent {
  loadingService = inject(LoadingService);
  /**
   * Observable que indica si se debe mostrar el loading
   */
  loading$ = this.loadingService.loading$;
  static \u0275fac = function LoadingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoadingComponent, selectors: [["app-loading"]], decls: 2, vars: 3, consts: [["class", "loading-overlay", 4, "ngIf"], [1, "loading-overlay"], [1, "loading-container"], ["diameter", "60", "strokeWidth", "4"], [1, "loading-text"]], template: function LoadingComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, LoadingComponent_div_0_Template, 5, 0, "div", 0);
      \u0275\u0275pipe(1, "async");
    }
    if (rf & 2) {
      \u0275\u0275property("ngIf", \u0275\u0275pipeBind1(1, 1, ctx.loading$));
    }
  }, dependencies: [CommonModule, NgIf, AsyncPipe, MatProgressSpinnerModule, MatProgressSpinner], styles: ["\n\n.loading-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 9999;\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.loading-container[_ngcontent-%COMP%] {\n  background: white;\n  padding: 2rem;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  min-width: 200px;\n}\n.loading-text[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n  font-size: 1rem;\n  font-weight: 500;\n}\nmat-spinner[_ngcontent-%COMP%] {\n  --mdc-circular-progress-active-indicator-color: #1976d2;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.9);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.loading-container[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease-out;\n}\n/*# sourceMappingURL=loading.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingComponent, [{
    type: Component,
    args: [{ selector: "app-loading", standalone: true, imports: [CommonModule, MatProgressSpinnerModule], template: `
    <div class="loading-overlay" *ngIf="loading$ | async">
      <div class="loading-container">
        <mat-spinner diameter="60" strokeWidth="4"></mat-spinner>
        <p class="loading-text">Procesando...</p>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:scss;beae7bfaf690620eb2e0aa32fb1d691af6f02ec3c35e455aef7db23d9bf12924;/home/runner/work/bipal-front/bipal-front/src/app/core/components/loading/loading.component.ts */\n.loading-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 9999;\n  -webkit-backdrop-filter: blur(2px);\n  backdrop-filter: blur(2px);\n}\n.loading-container {\n  background: white;\n  padding: 2rem;\n  border-radius: 12px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 1rem;\n  min-width: 200px;\n}\n.loading-text {\n  margin: 0;\n  color: #666;\n  font-size: 1rem;\n  font-weight: 500;\n}\nmat-spinner {\n  --mdc-circular-progress-active-indicator-color: #1976d2;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: scale(0.9);\n  }\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n.loading-container {\n  animation: fadeIn 0.3s ease-out;\n}\n/*# sourceMappingURL=loading.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoadingComponent, { className: "LoadingComponent", filePath: "src/app/core/components/loading/loading.component.ts", lineNumber: 73 });
})();

// src/app/core/components/skeleton/skeleton-banner.component.ts
var SkeletonBannerComponent = class _SkeletonBannerComponent {
  static \u0275fac = function SkeletonBannerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SkeletonBannerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SkeletonBannerComponent, selectors: [["app-skeleton-banner"]], decls: 5, vars: 0, consts: [["aria-label", "Cargando", "role", "status", 1, "skeleton-banner"], [1, "skeleton-image"], [1, "skeleton-overlay"], [1, "skeleton-text"]], template: function SkeletonBannerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementStart(2, "div", 2)(3, "span", 3);
      \u0275\u0275text(4, "Cargando...");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [CommonModule], styles: ['\n\n.skeleton-banner[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  max-width: 100%;\n  aspect-ratio: 16/4;\n  border-radius: 16px;\n  overflow: hidden;\n  background: var(--surface-container-low, #f3f3f3);\n}\n.skeleton-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background: url("./media/banner.png") center no-repeat;\n  filter: grayscale(80%) brightness(0.9) contrast(1.05);\n  opacity: 0.35;\n}\n.skeleton-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0) 0%,\n      rgba(255, 255, 255, 0.35) 50%,\n      rgba(255, 255, 255, 0) 100%);\n  background-size: 200% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.4s ease-in-out infinite;\n}\n.skeleton-text[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--primary-color, #1976d2);\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);\n}\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=skeleton-banner.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SkeletonBannerComponent, [{
    type: Component,
    args: [{ selector: "app-skeleton-banner", imports: [CommonModule], template: '<div class="skeleton-banner" aria-label="Cargando" role="status">\n  <div class="skeleton-image"></div>\n  <div class="skeleton-overlay">\n    <span class="skeleton-text">Cargando...</span>\n  </div>\n</div>\n', styles: ['/* src/app/core/components/skeleton/skeleton-banner.component.scss */\n.skeleton-banner {\n  position: relative;\n  width: 100%;\n  max-width: 100%;\n  aspect-ratio: 16/4;\n  border-radius: 16px;\n  overflow: hidden;\n  background: var(--surface-container-low, #f3f3f3);\n}\n.skeleton-image {\n  width: 100%;\n  height: 100%;\n  background: url("./media/banner.png") center no-repeat;\n  filter: grayscale(80%) brightness(0.9) contrast(1.05);\n  opacity: 0.35;\n}\n.skeleton-overlay {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      90deg,\n      rgba(255, 255, 255, 0) 0%,\n      rgba(255, 255, 255, 0.35) 50%,\n      rgba(255, 255, 255, 0) 100%);\n  background-size: 200% 100%;\n  animation: shimmer 1.4s ease-in-out infinite;\n}\n.skeleton-text {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--primary-color, #1976d2);\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);\n}\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n/*# sourceMappingURL=skeleton-banner.component.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SkeletonBannerComponent, { className: "SkeletonBannerComponent", filePath: "src/app/core/components/skeleton/skeleton-banner.component.ts", lineNumber: 10 });
})();

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/progress-bar.mjs
function MatProgressBar_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 2);
  }
}
var MAT_PROGRESS_BAR_DEFAULT_OPTIONS = new InjectionToken("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");
var MAT_PROGRESS_BAR_LOCATION = new InjectionToken("mat-progress-bar-location", {
  providedIn: "root",
  factory: MAT_PROGRESS_BAR_LOCATION_FACTORY
});
function MAT_PROGRESS_BAR_LOCATION_FACTORY() {
  const _document = inject(DOCUMENT);
  const _location = _document ? _document.location : null;
  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => _location ? _location.pathname + _location.search : ""
  };
}
var MatProgressBar = class _MatProgressBar {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _renderer = inject(Renderer2);
  _cleanupTransitionEnd;
  _animationMode = inject(ANIMATION_MODULE_TYPE, {
    optional: true
  });
  constructor() {
    const defaults = inject(MAT_PROGRESS_BAR_DEFAULT_OPTIONS, {
      optional: true
    });
    this._isNoopAnimation = this._animationMode === "NoopAnimations";
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      this.mode = defaults.mode || this.mode;
    }
  }
  /** Flag that indicates whether NoopAnimations mode is set to true. */
  _isNoopAnimation = false;
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the progress bar. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/progress-bar/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  _color;
  _defaultColor = "primary";
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  _value = 0;
  /** Buffer value of the progress bar. Defaults to zero. */
  get bufferValue() {
    return this._bufferValue || 0;
  }
  set bufferValue(v) {
    this._bufferValue = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  _bufferValue = 0;
  /**
   * Event emitted when animation of the primary progress bar completes. This event will not
   * be emitted when animations are disabled, nor will it be emitted for modes with continuous
   * animations (indeterminate and query).
   */
  animationEnd = new EventEmitter();
  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  get mode() {
    return this._mode;
  }
  set mode(value) {
    this._mode = value;
    this._changeDetectorRef.markForCheck();
  }
  _mode = "determinate";
  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._cleanupTransitionEnd = this._renderer.listen(this._elementRef.nativeElement, "transitionend", this._transitionendHandler);
    });
  }
  ngOnDestroy() {
    this._cleanupTransitionEnd?.();
  }
  /** Gets the transform style that should be applied to the primary bar. */
  _getPrimaryBarTransform() {
    return `scaleX(${this._isIndeterminate() ? 1 : this.value / 100})`;
  }
  /** Gets the `flex-basis` value that should be applied to the buffer bar. */
  _getBufferBarFlexBasis() {
    return `${this.mode === "buffer" ? this.bufferValue : 100}%`;
  }
  /** Returns whether the progress bar is indeterminate. */
  _isIndeterminate() {
    return this.mode === "indeterminate" || this.mode === "query";
  }
  /** Event handler for `transitionend` events. */
  _transitionendHandler = (event) => {
    if (this.animationEnd.observers.length === 0 || !event.target || !event.target.classList.contains("mdc-linear-progress__primary-bar")) {
      return;
    }
    if (this.mode === "determinate" || this.mode === "buffer") {
      this._ngZone.run(() => this.animationEnd.next({
        value: this.value
      }));
    }
  };
  static \u0275fac = function MatProgressBar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressBar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatProgressBar,
    selectors: [["mat-progress-bar"]],
    hostAttrs: ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", "tabindex", "-1", 1, "mat-mdc-progress-bar", "mdc-linear-progress"],
    hostVars: 10,
    hostBindings: function MatProgressBar_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-valuenow", ctx._isIndeterminate() ? null : ctx.value)("mode", ctx.mode);
        \u0275\u0275classMap("mat-" + ctx.color);
        \u0275\u0275classProp("_mat-animation-noopable", ctx._isNoopAnimation)("mdc-linear-progress--animation-ready", !ctx._isNoopAnimation)("mdc-linear-progress--indeterminate", ctx._isIndeterminate());
      }
    },
    inputs: {
      color: "color",
      value: [2, "value", "value", numberAttribute],
      bufferValue: [2, "bufferValue", "bufferValue", numberAttribute],
      mode: "mode"
    },
    outputs: {
      animationEnd: "animationEnd"
    },
    exportAs: ["matProgressBar"],
    decls: 7,
    vars: 5,
    consts: [["aria-hidden", "true", 1, "mdc-linear-progress__buffer"], [1, "mdc-linear-progress__buffer-bar"], [1, "mdc-linear-progress__buffer-dots"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"], [1, "mdc-linear-progress__bar-inner"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__secondary-bar"]],
    template: function MatProgressBar_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275template(2, MatProgressBar_Conditional_2_Template, 1, 0, "div", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 3);
        \u0275\u0275element(4, "span", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 5);
        \u0275\u0275element(6, "span", 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleProp("flex-basis", ctx._getBufferBarFlexBasis());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.mode === "buffer" ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275styleProp("transform", ctx._getPrimaryBarTransform());
      }
    },
    styles: [`.mat-mdc-progress-bar{display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mdc-linear-progress-track-height, 4px),var(--mdc-linear-progress-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mdc-linear-progress-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mdc-linear-progress-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mdc-linear-progress-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mdc-linear-progress-track-height, 4px);border-radius:var(--mdc-linear-progress-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{-webkit-mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");background-repeat:repeat-x;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear;background-color:var(--mdc-linear-progress-track-color, var(--mat-sys-surface-variant))}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mdc-linear-progress-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mdc-linear-progress-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}
`],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBar, [{
    type: Component,
    args: [{
      selector: "mat-progress-bar",
      exportAs: "matProgressBar",
      host: {
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        "tabindex": "-1",
        "[attr.aria-valuenow]": "_isIndeterminate() ? null : value",
        "[attr.mode]": "mode",
        "class": "mat-mdc-progress-bar mdc-linear-progress",
        "[class]": '"mat-" + color',
        "[class._mat-animation-noopable]": "_isNoopAnimation",
        "[class.mdc-linear-progress--animation-ready]": "!_isNoopAnimation",
        "[class.mdc-linear-progress--indeterminate]": "_isIndeterminate()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `<!--
  All children need to be hidden for screen readers in order to support ChromeVox.
  More context in the issue: https://github.com/angular/components/issues/22165.
-->
<div class="mdc-linear-progress__buffer" aria-hidden="true">
  <div
    class="mdc-linear-progress__buffer-bar"
    [style.flex-basis]="_getBufferBarFlexBasis()"></div>
  <!-- Remove the dots outside of buffer mode since they can cause CSP issues (see #28938) -->
  @if (mode === 'buffer') {
    <div class="mdc-linear-progress__buffer-dots"></div>
  }
</div>
<div
  class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
  aria-hidden="true"
  [style.transform]="_getPrimaryBarTransform()">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar" aria-hidden="true">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
`,
      styles: [`.mat-mdc-progress-bar{display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mdc-linear-progress-track-height, 4px),var(--mdc-linear-progress-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mdc-linear-progress-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mdc-linear-progress-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mdc-linear-progress-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mdc-linear-progress-track-height, 4px);border-radius:var(--mdc-linear-progress-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{-webkit-mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E");background-repeat:repeat-x;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear;background-color:var(--mdc-linear-progress-track-color, var(--mat-sys-surface-variant))}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mdc-linear-progress-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mdc-linear-progress-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}
`]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    bufferValue: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    animationEnd: [{
      type: Output
    }],
    mode: [{
      type: Input
    }]
  });
})();
function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
var MatProgressBarModule = class _MatProgressBarModule {
  static \u0275fac = function MatProgressBarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressBarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatProgressBarModule,
    imports: [MatProgressBar],
    exports: [MatProgressBar, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBarModule, [{
    type: NgModule,
    args: [{
      imports: [MatProgressBar],
      exports: [MatProgressBar, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/core/services/http-get-loading.service.ts
var HttpGetLoadingService = class _HttpGetLoadingService {
  counter = 0;
  subject = new BehaviorSubject(false);
  /** Emite true mientras existan GET en vuelo; aplica anti-flicker al ocultar */
  loading$ = this.subject.asObservable().pipe(distinctUntilChanged(), switchMap((v) => v ? [true] : timer(120).pipe(switchMap(() => [false]))));
  show() {
    this.counter++;
    if (this.counter === 1)
      this.subject.next(true);
  }
  hide() {
    if (this.counter > 0)
      this.counter--;
    if (this.counter === 0)
      this.subject.next(false);
  }
  forceClear() {
    this.counter = 0;
    this.subject.next(false);
  }
  static \u0275fac = function HttpGetLoadingService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HttpGetLoadingService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HttpGetLoadingService, factory: _HttpGetLoadingService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HttpGetLoadingService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/core/components/top-get-loading-bar/top-get-loading-bar.component.ts
function TopGetLoadingBarComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0);
    \u0275\u0275element(1, "mat-progress-bar", 1);
    \u0275\u0275elementEnd();
  }
}
var TopGetLoadingBarComponent = class _TopGetLoadingBarComponent {
  svc = inject(HttpGetLoadingService);
  loading$ = this.svc.loading$;
  static \u0275fac = function TopGetLoadingBarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TopGetLoadingBarComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TopGetLoadingBarComponent, selectors: [["app-top-get-loading-bar"]], decls: 2, vars: 3, consts: [[1, "get-loading-bar-wrapper"], ["mode", "indeterminate", "color", "primary"]], template: function TopGetLoadingBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, TopGetLoadingBarComponent_Conditional_0_Template, 2, 0, "div", 0);
      \u0275\u0275pipe(1, "async");
    }
    if (rf & 2) {
      \u0275\u0275conditional(\u0275\u0275pipeBind1(1, 1, ctx.loading$) ? 0 : -1);
    }
  }, dependencies: [MatProgressBarModule, MatProgressBar, AsyncPipe], styles: ["\n\n.get-loading-bar-wrapper[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1100;\n  pointer-events: none;\n}\n/*# sourceMappingURL=top-get-loading-bar.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TopGetLoadingBarComponent, [{
    type: Component,
    args: [{ selector: "app-top-get-loading-bar", standalone: true, imports: [MatProgressBarModule, AsyncPipe], template: `
    @if (loading$ | async) {
    <div class="get-loading-bar-wrapper">
      <mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
    </div>
    }
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["/* angular:styles/component:scss;c1d2239a7bb72e6fa694e98a36fe8aebbe4525b0914ac037245925903d4eae53;/home/runner/work/bipal-front/bipal-front/src/app/core/components/top-get-loading-bar/top-get-loading-bar.component.ts */\n.get-loading-bar-wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  z-index: 1100;\n  pointer-events: none;\n}\n/*# sourceMappingURL=top-get-loading-bar.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TopGetLoadingBarComponent, { className: "TopGetLoadingBarComponent", filePath: "src/app/core/components/top-get-loading-bar/top-get-loading-bar.component.ts", lineNumber: 31 });
})();

// node_modules/.pnpm/@angular+material@19.2.18_@angular+cdk@19.2.19_@angular+common@19.2.14_@angular+core@19_102b8bfb5e382f9d0615b5538deb6474/node_modules/@angular/material/fesm2022/internal-form-field-grv62mCZ.mjs
var _c04 = ["mat-internal-form-field", ""];
var _c13 = ["*"];
var _MatInternalFormField = class __MatInternalFormField {
  /** Position of the label relative to the content. */
  labelPosition;
  static \u0275fac = function _MatInternalFormField_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || __MatInternalFormField)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: __MatInternalFormField,
    selectors: [["div", "mat-internal-form-field", ""]],
    hostAttrs: [1, "mdc-form-field", "mat-internal-form-field"],
    hostVars: 2,
    hostBindings: function _MatInternalFormField_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275classProp("mdc-form-field--align-end", ctx.labelPosition === "before");
      }
    },
    inputs: {
      labelPosition: "labelPosition"
    },
    attrs: _c04,
    ngContentSelectors: _c13,
    decls: 1,
    vars: 0,
    template: function _MatInternalFormField_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275projection(0);
      }
    },
    styles: [".mat-internal-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-flex;align-items:center;vertical-align:middle}.mat-internal-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mat-internal-form-field>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatInternalFormField, [{
    type: Component,
    args: [{
      selector: "div[mat-internal-form-field]",
      template: "<ng-content></ng-content>",
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "class": "mdc-form-field mat-internal-form-field",
        "[class.mdc-form-field--align-end]": 'labelPosition === "before"'
      },
      styles: [".mat-internal-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-flex;align-items:center;vertical-align:middle}.mat-internal-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mat-internal-form-field>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0}\n"]
    }]
  }], null, {
    labelPosition: [{
      type: Input,
      args: [{
        required: true
      }]
    }]
  });
})();

export {
  MatLabel,
  MatError,
  MatHint,
  MatPrefix,
  MatSuffix,
  MatFormFieldControl,
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldModule,
  MatExpansionPanelContent,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle,
  MatAccordion,
  MatExpansionModule,
  _MatInternalFormField,
  MAT_INPUT_VALUE_ACCESSOR,
  ErrorStateMatcher,
  _ErrorStateTracker,
  MatInput,
  MatInputModule,
  LoadingComponent,
  SkeletonBannerComponent,
  HttpGetLoadingService,
  TopGetLoadingBarComponent
};
//# sourceMappingURL=chunk-KZXU2P5S.js.map
