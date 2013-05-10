package controllers

import play.api._
import play.api.mvc._
import play.api.libs.ws.WS
import play.api.libs.concurrent.Execution.Implicits._
import scala.language.postfixOps

import play.api.Play.current

import play.Logger
import play.api.libs.json.{JsValue, Json}
import scala.concurrent.Future


object MyController extends Controller {


//  def asyncRes(report:String)=Action{
//    Async(loadRes(report))
//  }

//  def loadRes(report: String) = Future[Result] {
  def asyncRes(report:String)=Action{
  implicit request =>

    val successFuture = WS.url(Application.url("experimental/events"))
      .withHeaders(("Accept", "application/json"))
      .withQueryString(("query", "[\"and\", [\"=\", \"status\", \"success\"],[\"=\", \"report\",\"" + report + "\"]]")).get()
    val failureFuture = WS.url(Application.url("experimental/events"))
      .withHeaders(("Accept", "application/json"))
      .withQueryString(("query", "[\"and\", [\"=\", \"status\", \"failure\"],[\"=\", \"report\",\"" + report + "\"]]")).get()
    val skippedFuture = WS.url(Application.url("experimental/events"))
      .withHeaders(("Accept", "application/json"))
      .withQueryString(("query", "[\"and\", [\"=\", \"status\", \"skipped\"],[\"=\", \"report\",\"" + report + "\"],[\"not\",[\"=\", \"resource-type\",\"Schedule\"]]]")).get()
    Async(
    for {
      success <- successFuture
      failure <- failureFuture
      skipped <- skippedFuture
    } yield {
      // Build a result using foo, bar, and baz
      Ok(Json.obj("success" -> Json.parse(success.body), "failure" -> Json.parse(failure.body), "skipped" -> Json.parse(skipped.body)))
    } )
  }


}