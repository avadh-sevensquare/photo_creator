import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class GradientCTAButton extends StatefulWidget {
  final String label;
  final VoidCallback onPressed;
  final String semanticsLabel;

  const GradientCTAButton({
    super.key,
    required this.label,
    required this.onPressed,
    required this.semanticsLabel,
  });

  @override
  State<GradientCTAButton> createState() => _GradientCTAButtonState();
}

class _GradientCTAButtonState extends State<GradientCTAButton>
    with SingleTickerProviderStateMixin {
  bool _pressed = false;

  @override
  Widget build(BuildContext context) {
    final bool disableAnimations = MediaQuery.maybeOf(context)?.disableAnimations ?? false;

    return Semantics(
      label: widget.semanticsLabel,
      button: true,
      child: GestureDetector(
        onTapDown: (_) => setState(() => _pressed = true),
        onTapCancel: () => setState(() => _pressed = false),
        onTapUp: (_) => setState(() => _pressed = false),
        onTap: widget.onPressed,
        child: AnimatedScale(
          scale: _pressed && !disableAnimations ? 0.98 : 1.0,
          duration: const Duration(milliseconds: 160),
          curve: Curves.easeOut,
          child: Container(
            height: AppRadii.buttonHeight,
            decoration: BoxDecoration(
              gradient: const LinearGradient(colors: AppColors.ctaGradient),
              borderRadius: BorderRadius.circular(999),
            ),
            alignment: Alignment.center,
            child: Text(
              widget.label,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontFamily: 'Poppins',
                    fontWeight: FontWeight.w700,
                    fontSize: 18,
                    color: Colors.white,
                  ),
            ),
          ),
        ),
      ),
    );
  }
}

