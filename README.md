# 🦎 Chameleon

Receive a new look every time you open Visual Studio Code:

- A random theme will be picked from the all of the installed themes, and will be configured in the `workbench.colorTheme` setting
- Configured fonts from the `editor.fontFamily` setting will be shuffled (comma-separated) in order to use a different font
- A random icon theme from all of the installed icon themes in the `workbench.iconTheme` setting
- A random product icon theme from all of the installed product icon themes in the `workbench.productIconTheme` setting

## Options

### chameleon.excludedThemes

By default, **🦎 Chameleon** rotates through all installed themes.
If you have a theme that you don't want to use, you can add the theme to the `chameleon.excludedThemes` option. To exclude all the built-in VSCode themes, add `default` to this options.

```json
{
  "chameleon.excludedThemes": ["default", "theme1", "theme2"]
}
```

### chameleon.uiTheme

To only use `dark` or `light` themes, use the `chameleon.uiTheme` option.
If you want to use all the themes, either remove the option or assign it to `all`.

```json
{
  "chameleon.uiTheme": "dark"
}
```

### chameleon.switchInterval

To specify the time (in hours) it takes to switch to the next theme, use the `chameleon.switchInterval` option.
If you want to keep the default action which is next startup assign it to `0`.

For example if you want chameleon to switch your themes every five hours you set it to 5.

```json
{
  "chameleon.switchInterval": 5
}
```

### chameleon.disableRotatingColorTheme

If set to `true` it keeps the same color theme, while rotating between the other settings.

```json
{
  "chameleon.disableRotatingColorTheme": true
}
```

### chameleon.disableRotatingFont

If set to `true` it keeps the same font family, while rotating between the other settings.

```json
{
  "chameleon.disableRotatingFont": true
}
```

### chameleon.disableRotatingIconTheme

If set to `true` it keeps the same iconset, while rotating between the other settings.

```json
{
  "chameleon.disableRotatingIconTheme": true
}
```

### chameleon.disableRotatingProductIconTheme

If set to `true` it keeps the same product icon theme, while rotating between the other settings.

```json
{
  "chameleon.disableRotatingProductIconTheme": true
}
```
