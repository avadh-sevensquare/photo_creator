import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class DotsIndicator extends StatelessWidget {
  final int count;
  final int activeIndex;
  final bool disableAnimations;

  const DotsIndicator({super.key, required this.count, required this.activeIndex, this.disableAnimations = false});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(count, (i) {
        final bool isActive = i == activeIndex;
        final double size = isActive ? 12 : 8;
        final Color color = isActive ? const Color(0xFF19D3E6) : AppColors.textSecondary.withValues(alpha: 0.5);
        return AnimatedContainer(
          duration: disableAnimations ? Duration.zero : const Duration(milliseconds: 240),
          margin: const EdgeInsets.symmetric(horizontal: 4),
          height: size,
          width: size,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(999),
          ),
        );
      }),
    );
  }
}

