workflow "Run tests" {
  on = "push"
  resolves = "test"
}

action "install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "test" {
  uses = "actions/npm@master"
  args = "test"
}
