# Deprecated
I'm not actually using this code anymore.  I switched to using  [skhd_parse.py](https://github.com/deekue/dotfiles/blob/macos_tiling_wm/bin/skhd_parse.py) and feeding it's output to Chrome with this keybind in my [skhdrc](https://github.com/deekue/dotfiles/blob/aa4b33a1968aeed1feadae4b08502a65d34fb5cc/config/skhd/skhdrc#L284)

```shell
# ## Launch // This Dialog // <fn><shift> ? ##
fn + shift - 0x2C : open -na "Google Chrome" --args --new-window --app="$(skhd_parse.py -f data)"
``` 
Leaving this here in case it's useful to anyone.

# Remontoire for Übersicht

A keybinding viewer widget for [SKHD](https://github.com/koekeishiya/skhd) and other programs.

Inspired by [Remontoire](https://github.com/regolith-linux/remontoire) from 
[Regolith Linux](https://regolith-linux.org) (which I sadly can't run on my
work MacBook), this widget uses the same
[Model](https://github.com/regolith-linux/remontoire#model) to mark up a config
file.

An example from [my 
config](https://github.com/deekue/dotfiles/blob/master/config/skhd/yabai_skhdrc) for Yabai+SKHD

```
## Session // Reload Key Bindings // <fn><Shift> r ##
fn + shift - r : skhd -r

## Navigate // Relative Window // <fn> k j h l ##
fn - h : yabai -m window --focus west
fn - j : yabai -m window --focus south
fn - k : yabai -m window --focus north
fn - l : yabai -m window --focus east
```

## Settings

change configFile at the top of `remontoire.jsx` to point to your marked up config file.

