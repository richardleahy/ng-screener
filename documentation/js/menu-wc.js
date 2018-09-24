'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`<nav>
    <ul class="list">
        <li class="title">
            <a href="index.html" data-type="index-link">ng-screener documentation</a>
        </li>
        <li class="divider"></li>
        ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
</div>
` : '' }
        <li class="chapter">
            <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
            <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                            <a href="license.html"
                        data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                    <li class="link">
                        <a href="dependencies.html"
                            data-type="chapter-link">
                            <span class="icon ion-ios-list"></span>Dependencies
                        </a>
                    </li>
            </ul>
        </li>
        <li class="chapter modules">
            <a data-type="chapter-link" href="modules.html">
                <div class="menu-toggler linked" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                    <span class="icon ion-ios-archive"></span>
                    <span class="link-name">Modules</span>
                    <span class="icon ion-ios-arrow-down"></span>
                </div>
            </a>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                    <li class="link">
                        <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AppModule-fcd5bcfb8487b6f4f78d19a4985c52e9"' : 'data-target="#xs-components-links-module-AppModule-fcd5bcfb8487b6f4f78d19a4985c52e9"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AppModule-fcd5bcfb8487b6f4f78d19a4985c52e9"' : 'id="xs-components-links-module-AppModule-fcd5bcfb8487b6f4f78d19a4985c52e9"' }>
                                        <li class="link">
                                            <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-AuthModule-bfd4c7f6f7d176157a2af5c508ef9c13"' : 'data-target="#xs-components-links-module-AuthModule-bfd4c7f6f7d176157a2af5c508ef9c13"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-AuthModule-bfd4c7f6f7d176157a2af5c508ef9c13"' : 'id="xs-components-links-module-AuthModule-bfd4c7f6f7d176157a2af5c508ef9c13"' }>
                                        <li class="link">
                                            <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/AuthRoutingModule.html" data-type="entity-link">AuthRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/CandidatesModule.html" data-type="entity-link">CandidatesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CandidatesModule-133d328c21328eba44d010f74046cf76"' : 'data-target="#xs-components-links-module-CandidatesModule-133d328c21328eba44d010f74046cf76"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CandidatesModule-133d328c21328eba44d010f74046cf76"' : 'id="xs-components-links-module-CandidatesModule-133d328c21328eba44d010f74046cf76"' }>
                                        <li class="link">
                                            <a href="components/CandidateAddEditFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CandidateAddEditFormComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CandidateScreenComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CandidateScreenComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CandidatesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CandidatesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/CandidatesListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CandidatesListComponent</a>
                                        </li>
                                </ul>
                            </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#pipes-links-module-CandidatesModule-133d328c21328eba44d010f74046cf76"' : 'data-target="#xs-pipes-links-module-CandidatesModule-133d328c21328eba44d010f74046cf76"' }>
                                    <span class="icon ion-md-add"></span>
                                    <span>Pipes</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="pipes-links-module-CandidatesModule-133d328c21328eba44d010f74046cf76"' : 'id="xs-pipes-links-module-CandidatesModule-133d328c21328eba44d010f74046cf76"' }>
                                        <li class="link">
                                            <a href="pipes/FilterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">FilterPipe</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CandidatesRoutingModule.html" data-type="entity-link">CandidatesRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/CategoriesModule.html" data-type="entity-link">CategoriesModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-CategoriesModule-902a3c91364ccfa104630661d285069a"' : 'data-target="#xs-components-links-module-CategoriesModule-902a3c91364ccfa104630661d285069a"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-CategoriesModule-902a3c91364ccfa104630661d285069a"' : 'id="xs-components-links-module-CategoriesModule-902a3c91364ccfa104630661d285069a"' }>
                                        <li class="link">
                                            <a href="components/CategoriesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoriesComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/CategoriesRoutingModule.html" data-type="entity-link">CategoriesRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-DashboardModule-0bbc9ab7f4664b8c6fbbdbe07e00d416"' : 'data-target="#xs-components-links-module-DashboardModule-0bbc9ab7f4664b8c6fbbdbe07e00d416"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-DashboardModule-0bbc9ab7f4664b8c6fbbdbe07e00d416"' : 'id="xs-components-links-module-DashboardModule-0bbc9ab7f4664b8c6fbbdbe07e00d416"' }>
                                        <li class="link">
                                            <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/DashboardRoutingModule.html" data-type="entity-link">DashboardRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-HomeModule-aeb5a9df3d7891c85035b285d7c342ae"' : 'data-target="#xs-components-links-module-HomeModule-aeb5a9df3d7891c85035b285d7c342ae"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-HomeModule-aeb5a9df3d7891c85035b285d7c342ae"' : 'id="xs-components-links-module-HomeModule-aeb5a9df3d7891c85035b285d7c342ae"' }>
                                        <li class="link">
                                            <a href="components/HomeCandidatesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeCandidatesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeCategoriesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeCategoriesComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeQuestionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeQuestionsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeScreensComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeScreensComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/LayoutModule.html" data-type="entity-link">LayoutModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-LayoutModule-712dfc679f1f5977e8703bb9586aa5ba"' : 'data-target="#xs-components-links-module-LayoutModule-712dfc679f1f5977e8703bb9586aa5ba"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-LayoutModule-712dfc679f1f5977e8703bb9586aa5ba"' : 'id="xs-components-links-module-LayoutModule-712dfc679f1f5977e8703bb9586aa5ba"' }>
                                        <li class="link">
                                            <a href="components/LayoutCardBodyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutCardBodyComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutCardComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutCardFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutCardFooterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutCardHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutCardHeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutContentComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutFooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutFooterComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutHeaderComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/LayoutSidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">LayoutSidebarComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MiscModule.html" data-type="entity-link">MiscModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-MiscModule-87110834ceca924112eea5cb8a6d8111"' : 'data-target="#xs-components-links-module-MiscModule-87110834ceca924112eea5cb8a6d8111"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-MiscModule-87110834ceca924112eea5cb8a6d8111"' : 'id="xs-components-links-module-MiscModule-87110834ceca924112eea5cb8a6d8111"' }>
                                        <li class="link">
                                            <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ErrorComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/SpinnerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpinnerComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/MiscRoutingModule.html" data-type="entity-link">MiscRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/QuestionsModule.html" data-type="entity-link">QuestionsModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-QuestionsModule-27b3de8a4f7e5724f8e12a0777063d58"' : 'data-target="#xs-components-links-module-QuestionsModule-27b3de8a4f7e5724f8e12a0777063d58"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-QuestionsModule-27b3de8a4f7e5724f8e12a0777063d58"' : 'id="xs-components-links-module-QuestionsModule-27b3de8a4f7e5724f8e12a0777063d58"' }>
                                        <li class="link">
                                            <a href="components/QuestionAddEditFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionAddEditFormComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/QuestionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/QuestionsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">QuestionsListComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/QuestionsRoutingModule.html" data-type="entity-link">QuestionsRoutingModule</a>
                    </li>
                    <li class="link">
                        <a href="modules/ScreensModule.html" data-type="entity-link">ScreensModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse"
                                    ${ isNormalMode ? 'data-target="#components-links-module-ScreensModule-5a0153dadabd2268da60c12046d1445f"' : 'data-target="#xs-components-links-module-ScreensModule-5a0153dadabd2268da60c12046d1445f"' }>
                                    <span class="icon ion-md-cog"></span>
                                    <span>Components</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse"
                                    ${ isNormalMode ? 'id="components-links-module-ScreensModule-5a0153dadabd2268da60c12046d1445f"' : 'id="xs-components-links-module-ScreensModule-5a0153dadabd2268da60c12046d1445f"' }>
                                        <li class="link">
                                            <a href="components/ScreenAddEditFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScreenAddEditFormComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ScreensComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScreensComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/ScreensListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScreensListComponent</a>
                                        </li>
                                </ul>
                            </li>
                    </li>
                    <li class="link">
                        <a href="modules/ScreensRoutingModule.html" data-type="entity-link">ScreensRoutingModule</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"' }>
                <span class="icon ion-ios-paper"></span>
                <span>Classes</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                    <li class="link">
                        <a href="classes/ActivatedRouteStub.html" data-type="entity-link">ActivatedRouteStub</a>
                    </li>
                    <li class="link">
                        <a href="classes/Candidate.html" data-type="entity-link">Candidate</a>
                    </li>
                    <li class="link">
                        <a href="classes/Category.html" data-type="entity-link">Category</a>
                    </li>
                    <li class="link">
                        <a href="classes/Error.html" data-type="entity-link">Error</a>
                    </li>
                    <li class="link">
                        <a href="classes/Error-1.html" data-type="entity-link">Error</a>
                    </li>
                    <li class="link">
                        <a href="classes/HttpResult.html" data-type="entity-link">HttpResult</a>
                    </li>
                    <li class="link">
                        <a href="classes/InMemoryDataService.html" data-type="entity-link">InMemoryDataService</a>
                    </li>
                    <li class="link">
                        <a href="classes/MenuItem.html" data-type="entity-link">MenuItem</a>
                    </li>
                    <li class="link">
                        <a href="classes/Question.html" data-type="entity-link">Question</a>
                    </li>
                    <li class="link">
                        <a href="classes/Screen.html" data-type="entity-link">Screen</a>
                    </li>
            </ul>
        </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                        ${ isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"' }>
                        <span class="icon ion-md-arrow-round-down"></span>
                        <span>Injectables</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                            <li class="link">
                                <a href="injectables/AnswerService.html" data-type="entity-link">AnswerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/CandidateService.html" data-type="entity-link">CandidateService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/CategoryService.html" data-type="entity-link">CategoryService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/QuestionService.html" data-type="entity-link">QuestionService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/ScreenService.html" data-type="entity-link">ScreenService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/SpinnerService.html" data-type="entity-link">SpinnerService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/StorageService.html" data-type="entity-link">StorageService</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#interceptors-links"' : 'data-target="#xs-interceptors-links"' }>
                <span class="icon ion-ios-swap"></span>
                <span>Interceptors</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                    <li class="link">
                        <a href="interceptors/AuthInterceptorService.html" data-type="entity-link">AuthInterceptorService</a>
                    </li>
            </ul>
        </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
                 ${ isNormalMode ? 'data-target="#guards-links"' : 'data-target="#xs-guards-links"' }>
            <span class="icon ion-ios-lock"></span>
            <span>Guards</span>
            <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
                ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                <li class="link">
                    <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                </li>
            </ul>
            </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse"
                    ${ isNormalMode ? 'data-target="#pipes-links"' : 'data-target="#xs-pipes-links"' }>
                        <span class="icon ion-md-add"></span>
                        <span>Pipes</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse"
                    ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                            <li class="link">
                                <a href="pipes/FilterPipe-1.html" data-type="entity-link">FilterPipe</a>
                            </li>
                            <li class="link">
                                <a href="pipes/FilterPipe-2.html" data-type="entity-link">FilterPipe</a>
                            </li>
                    </ul>
                </li>
        <li class="chapter">
            <div class="simple menu-toggler" data-toggle="collapse"
            ${ isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"' }>
                <span class="icon ion-ios-cube"></span>
                <span>Miscellaneous</span>
                <span class="icon ion-ios-arrow-down"></span>
            </div>
            <ul class="links collapse"
            ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                    <li class="link">
                      <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                    </li>
            </ul>
        </li>
            <li class="chapter">
                <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
            </li>
        <li class="chapter">
            <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
        </li>
        <li class="divider"></li>
        <li class="copyright">
                Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.svg" class="img-responsive" data-type="compodoc-logo">
                </a>
        </li>
    </ul>
</nav>`);
        this.innerHTML = tp.strings;
    }
});
