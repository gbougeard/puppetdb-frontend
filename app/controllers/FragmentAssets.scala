package controllers

import play.api.mvc._

object FragmentAssets extends Controller {

  val FRAGMENTS_PATH_PREFIX = List("public", "fragments")

  def at(file: String): Action[AnyContent] = {
    Assets.at("/" + FRAGMENTS_PATH_PREFIX.mkString("/"), file)
  }
}