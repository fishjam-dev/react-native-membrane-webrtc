#!/bin/bash
brew install swift-format 
npm install
chmod +x .githooks/*
cp .githooks/* .git/hooks