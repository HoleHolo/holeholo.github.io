---
title: 允许 Archlinux 用户挂载
date: 2023-10-29 12:35:07
tags: ArchLinux
---
# 允许用户挂载

## 新建 Polkit 规则

创建文件 `/etc/polkit-1/rules.d/50-udiskie.rules`​，写入以下内容：

```
polkit.addRule(function(action, subject) {
  var YES = polkit.Result.YES;
  var permission = {
    // required for udisks1:
    "org.freedesktop.udisks.filesystem-mount": YES,
    "org.freedesktop.udisks.luks-unlock": YES,
    "org.freedesktop.udisks.drive-eject": YES,
    "org.freedesktop.udisks.drive-detach": YES,
    // required for udisks2:
    "org.freedesktop.udisks2.filesystem-mount": YES,
    "org.freedesktop.udisks2.filesystem-mount-system": YES,
    "org.freedesktop.udisks2.encrypted-unlock": YES,
    "org.freedesktop.udisks2.eject-media": YES,
    "org.freedesktop.udisks2.power-off-drive": YES,
    // required for udisks2 if using udiskie from another seat (e.g. systemd):
    "org.freedesktop.udisks2.filesystem-mount-other-seat": YES,
    "org.freedesktop.udisks2.filesystem-unmount-others": YES,
    "org.freedesktop.udisks2.encrypted-unlock-other-seat": YES,
    "org.freedesktop.udisks2.encrypted-unlock-system": YES,
    "org.freedesktop.udisks2.eject-media-other-seat": YES,
    "org.freedesktop.udisks2.power-off-drive-other-seat": YES
  };
  if (subject.isInGroup("storage")) {
    return permission[action.id];
  }
});
```

这一步的作用是对于 `storage`​ 组中的用户，在身份验证时可自动通过。

## 把用户添加到 storage 组

为此，还需要把自己所在的用户添加到 `storage`​ 组。请运行以下命令：

```shell
# usermod -a -G storage 用户名
```

无需重启，即刻生效。
