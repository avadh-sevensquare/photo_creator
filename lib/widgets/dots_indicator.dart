import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class DotsIndicator extends StatelessWidget {
  final int count;
  final int activeIndex;

  const DotsIndicator({
    super.key,
    required this.count,
    required this.activeIndex,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(count, (index) {
        final bool isActive = index == activeIndex;
        return AnimatedContainer(
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
          margin: const EdgeInsets.symmetric(horizontal: 6),
          width: isActive ? 12 : 8,
          height: isActive ? 12 : 8,
          decoration: BoxDecoration(
            color: isActive ? const Color(0xFF19D3E6) : AppColors.textSecondary.withOpacity(0.35),
            shape: BoxShape.circle,
          ),
        );
      }),
    );
  }
}

