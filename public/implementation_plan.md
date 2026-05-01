# Masar Workforce Management System Scaffold

Generate a complete, modern Angular 21 project scaffold for 'Masar', a workforce management system.

## Proposed Changes

### Configuration & Dependencies
- Install PrimeNG, PrimeIcons, face-api.js, Chart.js, and Leaflet.
- Configure Tailwind CSS with Deep Navy (#1E293B) and Azure Blue (#3B82F6) color palette.
- Add Google Fonts: **Inter** and **Outfit** for that modern premium look.

### Core Infrastructure
- **ApiInterceptor**: Manage global loading state using PrimeNG `Dialog` and `ProgressSpinner`.
- **ErrorInterceptor**: Global error handling.
- **State Management**: Use Angular Signals for all reactive states.
- **ThemeService**: Handle dark/light mode with standard persistence.

### Services
- [AuthService](file:///e:/masar/src/app/core/services/auth.service.ts): Manage authentication state ($isLoggedIn, $user).
- [AttendanceService](file:///e:/masar/src/app/core/services/attendance.service.ts): Handle check-in/out, face-api.js integration, and GPS tracking.
- [TaskService](file:///e:/masar/src/app/core/services/task.service.ts): Manage task lifecycle, file uploads (camera vs gallery).
- [MapService](file:///e:/masar/src/app/core/services/map.service.ts): Leaflet configuration and dynamic pin management.
- [ChatService](file:///e:/masar/src/app/core/services/chat.service.ts): Real-time communication state (unread indicators).

### Component Scaffold (Split Architecture: .ts, .html, .css)
- **AppComponent**: Main layout container with conditional sidebar.
- **SidebarComponent**: Premium vertical navigation with active state glow.
- **NavbarComponent**: Top bar with search, notifications, and profile.
- **DashboardHomeComponent**: The high-fidelity "Operations Dashboard".

## Phase 6: Build Error Resolution & Optimization
- [x] Fix `fromGallery` property in `TaskListComponent`.
- [x] Fix missing imports (`Component`, `CommonModule`, `inject`) in `DashboardHomeComponent`.
- [x] Standardize all components to split file structure (HTML, CSS, TS).
- [x] Refactor Sidebar and Navbar into separate components.
- [ ] Implement **OnPush** change detection across all feature components.

## Phase 7: Operations Dashboard Redesign (Mockup Fidelity)
- [x] **Premium Sidebar**: Recreate the sidebar with the exact spacing, icons, and "active" glow effect from the mockup.
- [x] **Glassmorphism Cards**: Apply `backdrop-blur` and semi-transparent borders to all dashboard cards.
- [x] **Stat Cards Detail**: 
    - Radial progress for "Operational Status".
    - Micro-bar-charts for "Project Completion".
    - Pulse glow for "Active Deployments".
- [x] **Interactive Map Overlay**:
    - Custom Leaflet Dark Theme (using Mapbox or generic tiles with CSS filters).
    - Floating legend/key with "Intelligence Key" styling.
    - Custom SVG markers for vehicles and sites.

## Phase 8: Advanced Visuals & Charts (Chart.js Integration)
- [x] **Fleet Status Chart**: Replace CSS bars with Chart.js `Bar` chart using custom gradients and rounded corners.
- [x] **Attendance Flow**: Replace SVG path with a refined `Line` chart using `tension` for smooth curves and "glow" points.
- [x] **Project Milestones**: Implement multi-gradient progress bars with animated loading states.

## Phase 9: Global Theming & Motion
- [x] **Dark/Light Mode**: Full CSS Variable system implementation ensuring the Azure/Navy palette adapts gracefully.
- [x] **Micro-animations**: Add entrance animations for all cards using `fade-in-up` with staggered delays.
- [x] **Hover States**: Premium scaling and glow effects on interactive elements.

## Phase 10: Deployment & Final Polish
- [ ] **Responsive Audit**: Ensure the 12-column grid collapses correctly on mobile (Sidebar -> Bottom bar/Drawer).
- [/] **Seo & Metadata**: Add dynamic page titles and meta descriptions for each route. (Partially Done)
- [/] **Performance**: Minimize initial bundle size using standalone components and lazy loading. (Started)

## Verification Plan

### Automated Tests
- Run `npm run build` to ensure no compilation errors.
- Verify 100% component accessibility (ARIA labels, keyboard nav).

### Manual Verification
- Compare dashboard rendering against `mockup.png` for pixel-perfect alignment.
- Switch theme and verify all colors update correctly.
- Test "Check-In" flow with mock GPS data.
- Verify real-time updates in the "Live Map" (simulated).
