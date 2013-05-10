package controllers

import play.api._
import play.api.mvc._
import play.api.libs.ws.WS
import play.api.libs.concurrent.Execution.Implicits._
import scala.language.postfixOps

import play.api.Play.current

import play.Logger


object Application extends Controller {

  def index = nodes

  def reports(node: String) = Action {
    implicit request =>
      Async {
        WS.url(url("experimental/reports"))
          .withHeaders(("Accept", "application/json"))
          .withQueryString(("query", "[\"=\", \"certname\", \"" + node + "\"]"))
          .get().map {
          response =>
            Logger.debug(response.body)
            Ok(views.html.reports("Reports for " + node, response.body))
        }
      }
  }

  def nodes = Action {
    implicit request =>
      Async {
        WS.url(url("v2/nodes"))
          .withHeaders(("Accept", "application/json"))
          .get().map {
          response =>
            Logger.debug(response.body)
            Ok(views.html.nodes("Nodes ", response.body))
        }
      }
  }

  def metrics = Action {
    implicit request =>
      Async {
        WS.url(url("metrics/mbeans"))
          .withHeaders(("Accept", "application/json"))
          .get().map {
          response =>
            Logger.debug(response.body)
            Ok(views.html.default("Metrics mbeans", response.body))
        }
      }
  }

  def node(node: String) = Action {
    implicit request =>
      Async {
        WS.url(url("v2/nodes/" + node))
          .withHeaders(("Accept", "application/json"))
          .get().map {
          response =>
            Logger.debug(response.body)
            Ok(views.html.nodes("Nodes ", response.body))
        }
      }
  }

  def facts(node: String) = Action {
    implicit request =>
      Async {
        WS.url(url("v2/facts"))
          .withHeaders(("Accept", "application/json"))
          .withQueryString(("query", "[\"=\", \"certname\", \"" + node + "\"]"))
          .get().map {
          response =>
            Logger.debug(response.body)
            Ok(views.html.facts(node+" facts", response.body))
        }
      }
  }

  def resources(node: String) = Action {
    implicit request =>
      Async {
        WS.url(url("v2/resources"))
          .withHeaders(("Accept", "application/json"))
          .withQueryString(("query", "[\"=\", \"certname\", \"" + node + "\"]"))
          .get().map {
          response =>
            Logger.debug(response.body)
            Ok(views.html.resources(node+" resources", response.body))
        }
      }
  }

  def events(hash: String) = Action {
    implicit request =>
      Async {
        WS.url(url("experimental/events"))
          .withHeaders(("Accept", "application/json"))
          .withQueryString(("query", "[\"=\", \"report\",\"" + hash + "\"]"))
          .get().map {
          response =>
            Logger.debug(response.body)
            Ok(views.html.events("Events for report " + hash, response.body))
        }
      }
  }
  def factNames = Action {
    implicit request =>
      Async {
        WS.url(url("v2/fact-names"))
          .withHeaders(("Accept", "application/json"))
//          .withQueryString(("query", "[\"=\", \"report\",\"" + hash + "\"]"))
          .get().map {
          response =>
            Logger.debug(response.body)
            Ok(views.html.default("Fact names", response.body))
        }
      }
  }

  // -- Javascript routing
  def javascriptRoutes = Action {
    implicit request =>
      Ok(
        Routes.javascriptRouter("jsRoutes")(
          //          Comments.view,
        )
      ).as("text/javascript")
  }

  def url(path: String): String = {
    val urlPuppetDB = Play.configuration.getString("puppetdb.url").getOrElse("http://localhost:8080/")
    urlPuppetDB + path
  }

}