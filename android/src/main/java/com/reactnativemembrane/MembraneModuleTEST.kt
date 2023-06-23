package com.reactnativemembrane

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

const val moduleName = "MembraneModuleTEST"

class MembraneModuleTEST : Module() {
  override fun definition() = ModuleDefinition {
    Name(moduleName)
    // Definition components go here
  }
}