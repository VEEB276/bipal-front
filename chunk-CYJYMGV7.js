import "./chunk-AULEXFFY.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-TRD36DVC.js";
import {
  ActivatedRoute,
  Component,
  MatButton,
  MatIcon,
  MatIconModule,
  RouterLink,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-IXVPDR65.js";
import "./chunk-UGR6JUJC.js";

// src/app/modules/hojadevida/pages/terminos-condiciones/terminos-condiciones.component.ts
function TerminosCondicionesComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 0)(1, "mat-icon");
    \u0275\u0275text(2, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Volver\n");
    \u0275\u0275elementEnd();
  }
}
var TerminosCondicionesComponent = class _TerminosCondicionesComponent {
  showBack = inject(ActivatedRoute).snapshot.data["backButton"] || false;
  static \u0275fac = function TerminosCondicionesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TerminosCondicionesComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TerminosCondicionesComponent, selectors: [["app-terminos-condiciones"]], decls: 58, vars: 1, consts: [["mat-button", "", "routerLink", "/auth"], [1, "terminos-wrapper"], [1, "title"], ["href", "https://registroinformacion.bucaramanga.gov.co", "target", "_blank", "rel", "noopener noreferrer"], ["href", "mailto:secretaria-administrativa@bucaramanga.gov.co"], [1, "importante"]], template: function TerminosCondicionesComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275template(0, TerminosCondicionesComponent_Conditional_0_Template, 4, 0, "button", 0);
      \u0275\u0275elementStart(1, "h1");
      \u0275\u0275text(2, "T\xE9rminos y condiciones");
      \u0275\u0275elementEnd();
      \u0275\u0275element(3, "mat-divider");
      \u0275\u0275elementStart(4, "section", 1)(5, "h3", 2);
      \u0275\u0275text(6, " AUTORIZACI\xD3N DE TRATAMIENTO DE MIS DATOS PERSONALES CON T\xC9RMINOS Y CONDICIONES ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p");
      \u0275\u0275text(8, " Bajo los t\xE9rminos del presente documento, el cual he le\xEDdo y comprendido en su totalidad las caracter\xEDsticas, requisitos y condiciones para la suscripci\xF3n y diligenciamiento de mis datos personales en el aplicativo Repositorio de Informaci\xF3n de Perfiles Acad\xE9micos Y Laborales de la Alcald\xEDa De Bucaramanga de la ALCALD\xCDA DE BUCARAMANGA, as\xED mismo, declaro que he comprendido los t\xE9rminos de referencia para los efectos anotados y que la informaci\xF3n suministrada es veraz y corresponde a la realidad, as\xED como tambi\xE9n declaro que comprendo y acepto a cabalidad que: ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p");
      \u0275\u0275text(10, " El registro de la informaci\xF3n laboral y/o profesional en este aplicativo NO implica compromiso o responsabilidad alguna por parte de la ALCALD\xCDA DE BUCARAMANGA para suscribir un contrato de prestaci\xF3n de servicios o de apoyo a la gesti\xF3n, ni ning\xFAn otro tipo de v\xEDnculo laboral. Al realizar su inscripci\xF3n, usted pone a disposici\xF3n la informaci\xF3n personal, su talento y capacidades con el fin de ampliar las posibilidades de acceso al mercado laboral, sin que ello suponga una contrataci\xF3n autom\xE1tica por parte de la ALCALD\xCDA DE BUCARAMANGA, ni estar en curso de proceso de selecci\xF3n alguno. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p");
      \u0275\u0275text(12, " El aplicativo de Banco de Informaci\xF3n de Perfiles Acad\xE9micos Y Laborales de la Alcald\xEDa De Bucaramanga de la ALCALD\xCDA DE BUCARAMANGA, tiene por objeto conformar un amplio directorio de potenciales oferentes de servicios que permita a la entidad escoger colaboradores con base en el m\xE9rito, esto es, por sus aptitudes, actitudes, desempe\xF1o y capacidad, en la contrataci\xF3n de talento humano mediante contrato de prestaci\xF3n de servicios profesionales y/o de apoyo a la gesti\xF3n, seg\xFAn sean las necesidades y capacidades de la ALCALD\xCDA DE BUCARAMANGA. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p");
      \u0275\u0275text(14, " El registro y actualizaci\xF3n de la informaci\xF3n en el aplicativo de Banco de Informaci\xF3n de Perfiles Acad\xE9micos Y Laborales de la Alcald\xEDa De Bucaramanga de la ALCALD\xCDA DE BUCARAMANGA es un servicio ");
      \u0275\u0275elementStart(15, "strong");
      \u0275\u0275text(16, "GRATUITO");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " y sin intermediarios al cual pueden acceder las personas interesadas en el registro de su perfil laboral o profesional en el aplicativo, a trav\xE9s del link ");
      \u0275\u0275elementStart(18, "a", 3);
      \u0275\u0275text(19, "https://registroinformacion.bucaramanga.gov.co");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "p");
      \u0275\u0275text(21, " El proceso de verificaci\xF3n de la informaci\xF3n est\xE1 amparado bajo ley estatutaria 1266 de 2008, ley 1581 del 2012, ley 1712 del 2014, decreto 255 del 2022, decreto 103 del 2015, decreto 1377 del 2013 y decreto 2952 del 2010 y, que refiere a la Ley de protecci\xF3n de datos (Habeas Data) y la normativa municipal que adopta, regula e implementa el Banco de informaci\xF3n de perfiles acad\xE9micos y laborales de de la Alcald\xEDa de Bucaramanga bajo la estrategia de cultura organizacional 2.0 y se dictan otras disposiciones. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "p");
      \u0275\u0275text(23, " El uso de los datos personales del usuario, ciudadano, se encuentran sujetos al cumplimiento de las disposiciones legales establecidas, as\xED como, al cumplimiento de la Pol\xEDtica de Protecci\xF3n de Datos personales de la ALCALD\xCDA DE BUCARAMANGA. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "p");
      \u0275\u0275text(25, " La informaci\xF3n suministrada en el aplicativo Repositorio de Informaci\xF3n de Perfiles Acad\xE9micos Y Laborales de la Alcald\xEDa De Bucaramanga de la ALCALD\xCDA DE BUCARAMANGA, se entender\xE1 recepcionada bajo la presunci\xF3n de buena fe de que trata el art\xEDculo 83 de la Constituci\xF3n Pol\xEDtica, por lo tanto, el usuario ciudadano, se compromete a suministrar en todo momento informaci\xF3n veraz, lo que, en todo caso, no limita la facultad de las entidades y organismos distritales para verificar su autenticidad. Las anomal\xEDas, inconsistencias y/o falsedades en la documentaci\xF3n registrada por los usuarios ciudadanos, podr\xE1n ocasionar sanciones legales y/o reglamentarias a que haya lugar, y/o a la exclusi\xF3n del aplicativo. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p");
      \u0275\u0275text(27, " Con la aceptaci\xF3n de t\xE9rminos y condiciones dispuestos en este documento, el interesado declara y acepta que ha le\xEDdo el instructivo para el diligenciamiento del aplicativo Repositorio de Informaci\xF3n de Perfiles Acad\xE9micos Y Laborales de de la ALCALD\xCDA DE BUCARAMANGA, dispuesto en el link ");
      \u0275\u0275elementStart(28, "a", 3);
      \u0275\u0275text(29, "https://registroinformacion.bucaramanga.gov.co");
      \u0275\u0275elementEnd();
      \u0275\u0275text(30, ", acepta y autoriza los t\xE9rminos y condiciones aqu\xED dispuestos; en consonancia con la pol\xEDtica de tratamiento de datos personales, ley estatutaria 1266 de 2008, ley 1581 del 2012, ley 1712 del 2014, decreto 255 del 2022, decreto 103 del 2015, decreto 1377 del 2013 y decreto 2952 del 2010 y y la normativa municipal que adopta, regula e implementa el Banco de informaci\xF3n de perfiles acad\xE9micos y laborales de de la Alcald\xEDa de Bucaramanga bajo la estrategia de cultura organizacional 2.0 y se dictan otras disposiciones. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "p")(32, "strong");
      \u0275\u0275text(33, "Nota:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(34, " En concordancia al presente documento, tambi\xE9n hace parte el manual instructivo de registro junto con los siguientes t\xE9rminos: ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "p");
      \u0275\u0275text(36, " El Banco de informaci\xF3n de perfiles acad\xE9micos y laborales, opera como una herramienta tecnol\xF3gica abierta y gratuita al p\xFAblico en general con ciertas restricciones de manejo de informaci\xF3n personal, esta \xF3pera mediante modelo de repositorio que busca personas interesadas en cargar informaci\xF3n relacionada a CAPITAL HUMANO, informaci\xF3n que en un futuro podr\xE1 servir de insumo de consulta caracterizada a disposici\xF3n de los diferentes despachos del municipio que requieran personal para alguna vinculaci\xF3n contractual mediante contratos de prestaci\xF3n de servicios profesionales y/o de apoyo a la gesti\xF3n, por ello cada usuario cliente interno y externo podr\xE1 de manera voluntaria registrar su perfil personal, acad\xE9mico y laboral sin que, en ning\xFAn caso, conlleve a la obligaci\xF3n de vinculaci\xF3n. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "p");
      \u0275\u0275text(38, " El aplicativo web bajo el dominio ");
      \u0275\u0275elementStart(39, "a", 3);
      \u0275\u0275text(40, "https://registroinformacion.bucaramanga.gov.co");
      \u0275\u0275elementEnd();
      \u0275\u0275text(41, " es administrado por la Oficina de las TICs y la Secretaria Administrativa; la cual, estar\xE1 disponible para que los ciudadanos registren su informaci\xF3n persona. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "p");
      \u0275\u0275text(43, " La informaci\xF3n suministrada se entender\xE1 recibida bajo la presunci\xF3n de la buena fe de que trata el art\xEDculo 83 de la Constituci\xF3n Pol\xEDtica, por lo tanto, se compromete a suministrar en todo momento informaci\xF3n veraz, lo que, en todo caso, no limita la facultad de las entidades y organismos descentralizados para verificar su autenticidad. Las anomal\xEDas, inconsistencias y/o falsedades en la documentaci\xF3n registrada por los ciudadanos, podr\xE1 conllevar a sanciones legales y/o reglamentarias a que haya lugar, y/o a la exclusi\xF3n del El Banco de informaci\xF3n de perfiles acad\xE9micos y laborales. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "p");
      \u0275\u0275text(45, " Los datos registrados ser\xE1n tratados seg\xFAn la pol\xEDtica de tratamiento de datos personales del municipio de Bucaramanga (Resoluci\xF3n N\xBA 0350 del 2023 y sus actualizaciones) y los estipulado en el marco regulatorio del El Banco de informaci\xF3n de perfiles acad\xE9micos y laborales y previo al registro de sus datos personales donde deber\xE1 aceptar t\xE9rminos y condiciones para el manejo de informaci\xF3n. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "p");
      \u0275\u0275text(47, " Quien se inscriba en El Repositorio de informaci\xF3n de perfiles acad\xE9micos y laborales, lo har\xE1 bajo el entendido de que se trata de un Banco de informaci\xF3n de perfiles acad\xE9micos y profesionales para una posible trasferencia de informaci\xF3n acorde a necesidades generales y/o contractuales discrecionales del Municipio de Bucaramanga, en ning\xFAn caso, estos datos generan relaci\xF3n laboral y/o contractual con el ente territorial. ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "p");
      \u0275\u0275text(49, " Si requiere asistencia y orientaci\xF3n para el registro de informaci\xF3n y diligenciamiento del perfil o reportar fallas en el sistema podr\xE1 comunicarse de lunes a viernes al correo electr\xF3nico ");
      \u0275\u0275elementStart(50, "a", 4);
      \u0275\u0275text(51, "secretaria-administrativa@bucaramanga.gov.co");
      \u0275\u0275elementEnd();
      \u0275\u0275text(52, ". Se debe tener cuenta que el momento de su solicitud o reporte deber\xE1 diligenciar sus datos de identificaci\xF3n tales como, numero de documento, nombres, apellidos, correo electr\xF3nico personal, n\xFAmero telef\xF3nico de contacto, cedula escaneada y descripci\xF3n de la novedad. ");
      \u0275\u0275elementEnd();
      \u0275\u0275element(53, "mat-divider");
      \u0275\u0275elementStart(54, "p", 5)(55, "strong");
      \u0275\u0275text(56, "IMPORTANTE:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(57, " El registro en el Banco de Hojas de Vida, no genera pago alguno y no es garant\xEDa expresa ni impl\xEDcita de otorgar contrato a quien haga uso de este repositorio. ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.showBack ? 0 : -1);
    }
  }, dependencies: [MatDividerModule, MatDivider, MatButton, RouterLink, MatIconModule, MatIcon], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  padding: 3.5rem;\n}\n[_nghost-%COMP%]   .terminos-wrapper[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n}\n@media screen and (max-width: 768px) {\n  [_nghost-%COMP%] {\n    padding: 2rem;\n  }\n}\n/*# sourceMappingURL=terminos-condiciones.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TerminosCondicionesComponent, [{
    type: Component,
    args: [{ selector: "app-terminos-condiciones", imports: [MatDividerModule, MatButton, RouterLink, MatIconModule], template: '@if(showBack){\n<button mat-button routerLink="/auth">\n  <mat-icon>arrow_back</mat-icon>\n  Volver\n</button>\n}\n<h1>T\xE9rminos y condiciones</h1>\n<mat-divider></mat-divider>\n<section class="terminos-wrapper">\n  <h3 class="title">\n    AUTORIZACI\xD3N DE TRATAMIENTO DE MIS DATOS PERSONALES CON T\xC9RMINOS Y\n    CONDICIONES\n  </h3>\n\n  <p>\n    Bajo los t\xE9rminos del presente documento, el cual he le\xEDdo y comprendido en\n    su totalidad las caracter\xEDsticas, requisitos y condiciones para la\n    suscripci\xF3n y diligenciamiento de mis datos personales en el aplicativo\n    Repositorio de Informaci\xF3n de Perfiles Acad\xE9micos Y Laborales de la Alcald\xEDa\n    De Bucaramanga de la ALCALD\xCDA DE BUCARAMANGA, as\xED mismo, declaro que he\n    comprendido los t\xE9rminos de referencia para los efectos anotados y que la\n    informaci\xF3n suministrada es veraz y corresponde a la realidad, as\xED como\n    tambi\xE9n declaro que comprendo y acepto a cabalidad que:\n  </p>\n\n  <p>\n    El registro de la informaci\xF3n laboral y/o profesional en este aplicativo NO\n    implica compromiso o responsabilidad alguna por parte de la ALCALD\xCDA DE\n    BUCARAMANGA para suscribir un contrato de prestaci\xF3n de servicios o de apoyo\n    a la gesti\xF3n, ni ning\xFAn otro tipo de v\xEDnculo laboral. Al realizar su\n    inscripci\xF3n, usted pone a disposici\xF3n la informaci\xF3n personal, su talento y\n    capacidades con el fin de ampliar las posibilidades de acceso al mercado\n    laboral, sin que ello suponga una contrataci\xF3n autom\xE1tica por parte de la\n    ALCALD\xCDA DE BUCARAMANGA, ni estar en curso de proceso de selecci\xF3n alguno.\n  </p>\n\n  <p>\n    El aplicativo de Banco de Informaci\xF3n de Perfiles Acad\xE9micos Y Laborales de\n    la Alcald\xEDa De Bucaramanga de la ALCALD\xCDA DE BUCARAMANGA, tiene por objeto\n    conformar un amplio directorio de potenciales oferentes de servicios que\n    permita a la entidad escoger colaboradores con base en el m\xE9rito, esto es,\n    por sus aptitudes, actitudes, desempe\xF1o y capacidad, en la contrataci\xF3n de\n    talento humano mediante contrato de prestaci\xF3n de servicios profesionales\n    y/o de apoyo a la gesti\xF3n, seg\xFAn sean las necesidades y capacidades de la\n    ALCALD\xCDA DE BUCARAMANGA.\n  </p>\n\n  <p>\n    El registro y actualizaci\xF3n de la informaci\xF3n en el aplicativo de Banco de\n    Informaci\xF3n de Perfiles Acad\xE9micos Y Laborales de la Alcald\xEDa De Bucaramanga\n    de la ALCALD\xCDA DE BUCARAMANGA es un servicio <strong>GRATUITO</strong> y sin\n    intermediarios al cual pueden acceder las personas interesadas en el\n    registro de su perfil laboral o profesional en el aplicativo, a trav\xE9s del\n    link\n    <a\n      href="https://registroinformacion.bucaramanga.gov.co"\n      target="_blank"\n      rel="noopener noreferrer"\n      >https://registroinformacion.bucaramanga.gov.co</a\n    >\n  </p>\n\n  <p>\n    El proceso de verificaci\xF3n de la informaci\xF3n est\xE1 amparado bajo ley\n    estatutaria 1266 de 2008, ley 1581 del 2012, ley 1712 del 2014, decreto 255\n    del 2022, decreto 103 del 2015, decreto 1377 del 2013 y decreto 2952 del\n    2010 y, que refiere a la Ley de protecci\xF3n de datos (Habeas Data) y la\n    normativa municipal que adopta, regula e implementa el Banco de informaci\xF3n\n    de perfiles acad\xE9micos y laborales de de la Alcald\xEDa de Bucaramanga bajo la\n    estrategia de cultura organizacional 2.0 y se dictan otras disposiciones.\n  </p>\n\n  <p>\n    El uso de los datos personales del usuario, ciudadano, se encuentran sujetos\n    al cumplimiento de las disposiciones legales establecidas, as\xED como, al\n    cumplimiento de la Pol\xEDtica de Protecci\xF3n de Datos personales de la ALCALD\xCDA\n    DE BUCARAMANGA.\n  </p>\n\n  <p>\n    La informaci\xF3n suministrada en el aplicativo Repositorio de Informaci\xF3n de\n    Perfiles Acad\xE9micos Y Laborales de la Alcald\xEDa De Bucaramanga de la ALCALD\xCDA\n    DE BUCARAMANGA, se entender\xE1 recepcionada bajo la presunci\xF3n de buena fe de\n    que trata el art\xEDculo 83 de la Constituci\xF3n Pol\xEDtica, por lo tanto, el\n    usuario ciudadano, se compromete a suministrar en todo momento informaci\xF3n\n    veraz, lo que, en todo caso, no limita la facultad de las entidades y\n    organismos distritales para verificar su autenticidad. Las anomal\xEDas,\n    inconsistencias y/o falsedades en la documentaci\xF3n registrada por los\n    usuarios ciudadanos, podr\xE1n ocasionar sanciones legales y/o reglamentarias a\n    que haya lugar, y/o a la exclusi\xF3n del aplicativo.\n  </p>\n\n  <p>\n    Con la aceptaci\xF3n de t\xE9rminos y condiciones dispuestos en este documento, el\n    interesado declara y acepta que ha le\xEDdo el instructivo para el\n    diligenciamiento del aplicativo Repositorio de Informaci\xF3n de Perfiles\n    Acad\xE9micos Y Laborales de de la ALCALD\xCDA DE BUCARAMANGA, dispuesto en el\n    link\n    <a\n      href="https://registroinformacion.bucaramanga.gov.co"\n      target="_blank"\n      rel="noopener noreferrer"\n      >https://registroinformacion.bucaramanga.gov.co</a\n    >, acepta y autoriza los t\xE9rminos y condiciones aqu\xED dispuestos; en\n    consonancia con la pol\xEDtica de tratamiento de datos personales, ley\n    estatutaria 1266 de 2008, ley 1581 del 2012, ley 1712 del 2014, decreto 255\n    del 2022, decreto 103 del 2015, decreto 1377 del 2013 y decreto 2952 del\n    2010 y y la normativa municipal que adopta, regula e implementa el Banco de\n    informaci\xF3n de perfiles acad\xE9micos y laborales de de la Alcald\xEDa de\n    Bucaramanga bajo la estrategia de cultura organizacional 2.0 y se dictan\n    otras disposiciones.\n  </p>\n\n  <p>\n    <strong>Nota:</strong> En concordancia al presente documento, tambi\xE9n hace\n    parte el manual instructivo de registro junto con los siguientes t\xE9rminos:\n  </p>\n\n  <p>\n    El Banco de informaci\xF3n de perfiles acad\xE9micos y laborales, opera como una\n    herramienta tecnol\xF3gica abierta y gratuita al p\xFAblico en general con ciertas\n    restricciones de manejo de informaci\xF3n personal, esta \xF3pera mediante modelo\n    de repositorio que busca personas interesadas en cargar informaci\xF3n\n    relacionada a CAPITAL HUMANO, informaci\xF3n que en un futuro podr\xE1 servir de\n    insumo de consulta caracterizada a disposici\xF3n de los diferentes despachos\n    del municipio que requieran personal para alguna vinculaci\xF3n contractual\n    mediante contratos de prestaci\xF3n de servicios profesionales y/o de apoyo a\n    la gesti\xF3n, por ello cada usuario cliente interno y externo podr\xE1 de manera\n    voluntaria registrar su perfil personal, acad\xE9mico y laboral sin que, en\n    ning\xFAn caso, conlleve a la obligaci\xF3n de vinculaci\xF3n.\n  </p>\n\n  <p>\n    El aplicativo web bajo el dominio\n    <a\n      href="https://registroinformacion.bucaramanga.gov.co"\n      target="_blank"\n      rel="noopener noreferrer"\n      >https://registroinformacion.bucaramanga.gov.co</a\n    >\n    es administrado por la Oficina de las TICs y la Secretaria Administrativa;\n    la cual, estar\xE1 disponible para que los ciudadanos registren su informaci\xF3n\n    persona.\n  </p>\n\n  <p>\n    La informaci\xF3n suministrada se entender\xE1 recibida bajo la presunci\xF3n de la\n    buena fe de que trata el art\xEDculo 83 de la Constituci\xF3n Pol\xEDtica, por lo\n    tanto, se compromete a suministrar en todo momento informaci\xF3n veraz, lo\n    que, en todo caso, no limita la facultad de las entidades y organismos\n    descentralizados para verificar su autenticidad. Las anomal\xEDas,\n    inconsistencias y/o falsedades en la documentaci\xF3n registrada por los\n    ciudadanos, podr\xE1 conllevar a sanciones legales y/o reglamentarias a que\n    haya lugar, y/o a la exclusi\xF3n del El Banco de informaci\xF3n de perfiles\n    acad\xE9micos y laborales.\n  </p>\n\n  <p>\n    Los datos registrados ser\xE1n tratados seg\xFAn la pol\xEDtica de tratamiento de\n    datos personales del municipio de Bucaramanga (Resoluci\xF3n N\xBA 0350 del 2023 y\n    sus actualizaciones) y los estipulado en el marco regulatorio del El Banco\n    de informaci\xF3n de perfiles acad\xE9micos y laborales y previo al registro de\n    sus datos personales donde deber\xE1 aceptar t\xE9rminos y condiciones para el\n    manejo de informaci\xF3n.\n  </p>\n\n  <p>\n    Quien se inscriba en El Repositorio de informaci\xF3n de perfiles acad\xE9micos y\n    laborales, lo har\xE1 bajo el entendido de que se trata de un Banco de\n    informaci\xF3n de perfiles acad\xE9micos y profesionales para una posible\n    trasferencia de informaci\xF3n acorde a necesidades generales y/o contractuales\n    discrecionales del Municipio de Bucaramanga, en ning\xFAn caso, estos datos\n    generan relaci\xF3n laboral y/o contractual con el ente territorial.\n  </p>\n\n  <p>\n    Si requiere asistencia y orientaci\xF3n para el registro de informaci\xF3n y\n    diligenciamiento del perfil o reportar fallas en el sistema podr\xE1\n    comunicarse de lunes a viernes al correo electr\xF3nico\n    <a href="mailto:secretaria-administrativa@bucaramanga.gov.co"\n      >secretaria-administrativa&#64;bucaramanga.gov.co</a\n    >. Se debe tener cuenta que el momento de su solicitud o reporte deber\xE1\n    diligenciar sus datos de identificaci\xF3n tales como, numero de documento,\n    nombres, apellidos, correo electr\xF3nico personal, n\xFAmero telef\xF3nico de\n    contacto, cedula escaneada y descripci\xF3n de la novedad.\n  </p>\n\n  <mat-divider></mat-divider>\n  <p class="importante">\n    <strong>IMPORTANTE:</strong>\n    El registro en el Banco de Hojas de Vida, no genera pago alguno y no es\n    garant\xEDa expresa ni impl\xEDcita de otorgar contrato a quien haga uso de este\n    repositorio.\n  </p>\n</section>\n', styles: ["/* src/app/modules/hojadevida/pages/terminos-condiciones/terminos-condiciones.component.scss */\n:host {\n  display: block;\n  padding: 3.5rem;\n}\n:host .terminos-wrapper {\n  margin-top: 2rem;\n}\n@media screen and (max-width: 768px) {\n  :host {\n    padding: 2rem;\n  }\n}\n/*# sourceMappingURL=terminos-condiciones.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TerminosCondicionesComponent, { className: "TerminosCondicionesComponent", filePath: "src/app/modules/hojadevida/pages/terminos-condiciones/terminos-condiciones.component.ts", lineNumber: 13 });
})();
export {
  TerminosCondicionesComponent
};
//# sourceMappingURL=chunk-CYJYMGV7.js.map
