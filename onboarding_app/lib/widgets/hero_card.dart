import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../onboarding/onboarding_state.dart';

class HeroCard extends StatelessWidget {
  final Widget child;
  final String semanticsLabel;
  final double aspectRatio;
  final PageController? parallaxController;
  final int? pageIndex;
  final double? heightFactor;

  const HeroCard({super.key, required this.child, required this.semanticsLabel, this.aspectRatio = 1.2, this.parallaxController, this.pageIndex, this.heightFactor});

  @override
  Widget build(BuildContext context) {
    final media = MediaQuery.of(context);
    final bool disable = media.disableAnimations;
    Widget content = child;
    if (parallaxController != null && pageIndex != null) {
      content = AnimatedBuilder(
        animation: parallaxController!,
        builder: (context, child) {
          final double page = parallaxController!.hasClients ? (parallaxController!.page ?? 0.0) : 0.0;
          final double delta = (page - (pageIndex ?? 0));
          final double translateX = disable ? 0.0 : delta * -16.0;
          return Transform.translate(offset: Offset(translateX, 0), child: child);
        },
        child: child,
      );
    }

    return LayoutBuilder(
      builder: (context, constraints) {
        final double targetHeight = heightFactor != null ? constraints.maxHeight * heightFactor! : constraints.maxWidth / aspectRatio;
        final double widthForHeight = targetHeight * aspectRatio;
        final double finalWidth = widthForHeight > constraints.maxWidth ? constraints.maxWidth : widthForHeight;
        final double finalHeight = finalWidth / aspectRatio;
        return Center(
          child: SizedBox(
            width: finalWidth,
            height: finalHeight,
            child: Semantics(
              label: semanticsLabel,
              container: true,
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: AppRadii.hero,
                  color: const Color(0xFF131C2B),
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.accentPurple.withValues(alpha: 0.28),
                      blurRadius: 32,
                      spreadRadius: 2,
                      offset: const Offset(0, 12),
                    ),
                  ],
                ),
                clipBehavior: Clip.antiAlias,
                child: content,
              ),
            ),
          ),
        );
      },
    );
  }
}

class TransformHero extends StatefulWidget {
  const TransformHero({super.key});

  @override
  State<TransformHero> createState() => _TransformHeroState();
}

class _TransformHeroState extends State<TransformHero> with SingleTickerProviderStateMixin {
  late final AnimationController _glowController;

  @override
  void initState() {
    super.initState();
    _glowController = AnimationController(vsync: this, duration: const Duration(seconds: 3))..repeat(reverse: true);
  }

  @override
  void dispose() {
    _glowController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final disable = MediaQuery.of(context).disableAnimations;
    return Stack(
      fit: StackFit.expand,
      children: [
        Positioned.fill(child: Container(color: const Color(0xFF1B2434))),
        Positioned.fill(
          child: AnimatedBuilder(
            animation: _glowController,
            builder: (context, child) {
              final opacity = disable ? 0.0 : (0.2 + 0.1 * (1 - (_glowController.value - 0.5).abs() * 2));
              return Container(
                decoration: BoxDecoration(
                  boxShadow: [
                    BoxShadow(
                      color: AppColors.accentPurple.withValues(alpha: opacity),
                      blurRadius: 48,
                      spreadRadius: 8,
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}

class TryOnHero extends StatelessWidget {
  final OnboardingState onboarding;
  const TryOnHero({super.key, required this.onboarding});

  @override
  Widget build(BuildContext context) {
    final disable = MediaQuery.of(context).disableAnimations;
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Expanded(child: _MiniBeforeAfterCard(label: 'Before', alignment: Alignment.topLeft)),
          const SizedBox(width: 12),
          AnimatedContainer(
            duration: disable ? Duration.zero : const Duration(milliseconds: 300),
            width: 28,
            height: 28,
            decoration: const BoxDecoration(shape: BoxShape.circle, color: Color(0xFF1D2A3E)),
            child: const Icon(Icons.arrow_forward_ios, color: Colors.white, size: 14),
          ),
          const SizedBox(width: 12),
          Expanded(child: _MiniBeforeAfterCard(label: 'After', alignment: Alignment.topRight)),
        ],
      ),
    );
  }
}

class _MiniBeforeAfterCard extends StatelessWidget {
  final String label;
  final Alignment alignment;
  const _MiniBeforeAfterCard({required this.label, required this.alignment});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: AppRadii.miniCard,
      child: Stack(
        fit: StackFit.expand,
        children: [
          Container(color: const Color(0xFF1B2434)),
          Positioned(
            top: 10,
            left: alignment == Alignment.topLeft ? 10 : null,
            right: alignment == Alignment.topRight ? 10 : null,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: const BoxDecoration(color: Color(0xFF222E44), borderRadius: AppRadii.pill),
              child: Text(
                label,
                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

