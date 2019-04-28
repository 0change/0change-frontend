<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="/">
            <i class="nav-icon icon-speedometer"></i> Home
            <span class="badge badge-primary">NEW</span>
          </a>
        </li>
        <li class="nav-title">Theme</li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'profile-id'}">
            <i class="nav-icon icon-user"></i>
            <span> Profile</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'wallet'}">
            <i class="nav-icon icon-wallet"></i>
            <span> Wallet</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <i class="nav-icon icon-bell"></i> Notifications</a>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'trades'}">
            <i class="nav-icon fa fa-handshake-o"></i>
            <span> Trades</span>
          </BaseLink>
        </li>
        <li class="nav-item">
          <BaseLink class="nav-link" :to="{name: 'disputes'}">
            <i class="nav-icon fa fa-balance-scale"></i>
            <span> Disputes</span>
          </BaseLink>
        </li>
        <li class="nav-item nav-dropdown">
          <a class="nav-link nav-dropdown-toggle" href="#">
            <i class="nav-icon fa fa-buysellads"></i> Advertisements</a>
          <ul class="nav-dropdown-items">
            <li class="nav-item">
              <BaseLink class="nav-link" :to="{name: 'advertisement'}">
                <i class="nav-icon icon-puzzle"></i>
                <span> List</span>
              </BaseLink>
            </li>
            <li class="nav-item">
              <BaseLink class="nav-link" :to="{name: 'advertisement-new'}">
                <i class="nav-icon icon-puzzle"></i>
                <span> New</span>
              </BaseLink>
            </li>
          </ul>
        </li>
        <li class="nav-title">Settings</li>
      </ul>
    </nav>
    <button class="sidebar-minimizer brand-minimizer" type="button"></button>
  </div>
</template>