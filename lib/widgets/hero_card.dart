import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class HeroCard extends StatefulWidget {
  final Widget child;
  final String semanticsLabel;
  final double aspectRatio;
  final double glowOpacity;
  final double parallax;

  const HeroCard({
    super.key,
    required this.child,
    required this.semanticsLabel,
    this.aspectRatio = 1.2,
    this.glowOpacity = 0.15,
    this.parallax = 0.0,
  });

  @override
  State<HeroCard> createState() => _HeroCardState();
}

class _HeroCardState extends State<HeroCard> with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(seconds: 3),
  )..repeat(reverse: true);

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final bool disableAnimations = MediaQuery.maybeOf(context)?.disableAnimations ?? false;
    if (disableAnimations) _controller.stop();

    return Semantics(
      label: widget.semanticsLabel,
      image: true,
      child: AspectRatio(
        aspectRatio: widget.aspectRatio,
        child: AnimatedBuilder(
          animation: _controller,
          builder: (context, child) {
            final double opacity =
                disableAnimations ? 0.0 : (widget.glowOpacity * (0.7 + 0.3 * _controller.value));
            return Transform.translate(
              offset: Offset(widget.parallax, 0),
              child: Container(
                decoration: BoxDecoration(
                  color: const Color(0xFF121B2A),
                  borderRadius: BorderRadius.circular(AppRadii.heroRadius),
                  boxShadow: AppShadows.heroShadow,
                  border: Border.all(color: Colors.white.withOpacity(0.05)),
                ),
                clipBehavior: Clip.antiAlias,
                child: Stack(
                  fit: StackFit.expand,
                  children: [
                    child!,
                    IgnorePointer(
                      child: AnimatedOpacity(
                        duration: const Duration(milliseconds: 600),
                        opacity: opacity,
                        child: Container(
                          decoration: BoxDecoration(
                            gradient: RadialGradient(
                              colors: [
                                AppColors.accentPurple.withOpacity(0.25),
                                Colors.transparent,
                              ],
                              radius: 1.0,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
          child: widget.child,
        ),
      ),
    );
  }
}

